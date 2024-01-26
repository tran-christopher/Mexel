/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import pg from 'pg';
import {
  ClientError,
  defaultMiddleware,
  errorMiddleware,
} from './lib/index.js';

type User = {
  userId: number;
  username: string;
  hashedPassword: string;
};

type Auth = {
  username: string;
  password: string;
};

type Song = {
  url: string;
  title: string;
  userId: number;
};

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
const db = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());
app.use(express.text({ type: 'text/plain' }));

const hashKey = process.env.TOKEN_SECRET;
if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

app.post('/api/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }
    const hashedPassword = await argon2.hash(password);
    const sql = `
        insert into "Users" ("username", "hashedPassword")
        values ($1, $2)
        returning *
        `;
    const params = [username, hashedPassword];
    const result = await db.query<User>(sql, params);
    const [user] = result.rows;
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
  }
});

app.post('/api/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }
    const sql = `
        select "userId", "hashedPassword"
        from "Users"
        where "username" = $1
        `;
    const params = [username];
    const result = await db.query<User>(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'invalid login');
    }
    const { userId, hashedPassword } = user;
    if (!(await argon2.verify(hashedPassword, password))) {
      throw new ClientError(401, 'invalid login');
    }
    const payload = { userId, username };
    const token = jwt.sign(payload, hashKey);
    res.json({ token, user: payload });
  } catch (error) {
    console.error(error);
  }
});

// test link
// http://www.youtube.com/watch?v=a0XEsck5ntk

app.post('/api/video', async (req, res, next) => {
  try {
    const linkToConvert = req.body;
    if (!linkToConvert) {
      throw new ClientError(400, 'please provide a valid link');
    }
    const sql = `
          insert into "Songs" ("url")
          values ($1)
          returning *
          `;
    const params = [linkToConvert];
    const result = await db.query(sql, params);
    const [song] = result.rows;
    // res.status(201).json(song[0].url);
    res.status(201).json(linkToConvert);
  } catch (error) {
    console.error(error);
  }
});

app.post('/api/title', async (req, res, next) => {
  try {
    console.log(req.body);
    const { url, userId } = req.body;
    if (!url) {
      throw new ClientError(400, 'please provide a valid link');
    }
    const getId = url.split('=');
    const infoObject = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${getId[1]}&key=${process.env.YOUTUBE_API_KEY}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!infoObject) {
      throw new Error(`google api fetch error `);
    }
    const data = await infoObject.json();
    const sql = `
          insert into "Songs" ("url", "title", "userId")
          values ($1, $2, $3)
          returning *
          `;
    const params = [url, data.items[0].snippet.title, userId];
    const result = await db.query<Song>(sql, params);
    console.log(`Song added: ${result.rows}`);
    res.status(201).json(url);
  } catch (error) {
    console.error(error);
  }
});

/*
 * Middleware that handles paths that aren't handled by static middleware
 * or API route handlers.
 * This must be the _last_ non-error middleware installed, after all the
 * get/post/put/etc. route handlers and just before errorMiddleware.
 */
app.use(defaultMiddleware(reactStaticDir));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
