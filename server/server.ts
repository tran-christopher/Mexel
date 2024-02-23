/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import fetch from 'node-fetch';
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

app.post('/api/video', async (req, res, next) => {
  try {
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
    if (!infoObject.ok) {
      throw new Error(`google api fetch error `);
    }
    const data: any = await infoObject.json();
    console.log(JSON.stringify(data.items[0].snippet.thumbnails));
    const videoData = [url, data.items[0].snippet.title, userId];
    res.status(201).json(videoData);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
});

app.post('/api/create-playlist', async (req, res, next) => {
  try {
    const { title, userId } = req.body;
    if (!title || !userId) {
      throw new ClientError(400, 'invalid playlist name or not signed in');
    }
    const sql = `
          insert into "Playlists" ("title", "userId")
          values ($1, $2)
          returning *
          `;
    const params = [title, userId];
    const result = await db.query(sql, params);
    const [newPlaylist] = result.rows;
    res.status(201).json(newPlaylist);
    console.log('Playlist added!');
  } catch (error) {
    console.error(error);
  }
});

app.post('/api/save', async (req, res, next) => {
  try {
    const [url, title, userId] = req.body;
    if (!url || !title || !userId) {
      throw new Error('unable to retrieve video data from fetch');
    }
    const sql = `
          insert into "Songs" ("url", "title", "userId")
          values ($1, $2, $3)
          returning *
          `;
    const params = [url, title, userId];
    const result = await db.query<Song>(sql, params);
    const [newVideo] = result.rows;
    res.status(201).json(newVideo);
    console.log('Video added!');
  } catch (error) {
    console.error(error);
  }
});

app.post('/api/get-all-songs', async (req, res, next) => {
  try {
    const [userId] = req.body;
    if (!userId) {
      throw new Error('not signed in');
    }
    const sql = `
          select *
          from "Songs"
          where "userId" = $1
          `;
    const params = [userId];
    const result = await db.query(sql, params);
    const allSongs = result.rows;
    res.status(201).json(allSongs);
    console.log(`All songs for userId:${userId} retrieved!`);
  } catch (error) {
    console.error(error);
  }
});

app.post('/api/get-all-playlists', async (req, res, next) => {
  try {
    const [userId] = req.body;
    if (!userId) {
      throw new Error('not signed in');
    }
    const sql = `
          select *
          from "Playlists"
          where "userId" = $1
          `;
    const params = [userId];
    const result = await db.query(sql, params);
    const allPlaylists = result.rows;
    res.status(201).json(allPlaylists);
    console.log(`All playlists for userId:${userId} retrieved!`);
  } catch (error) {
    console.error(error);
  }
});

app.post('/api/saving-to-playlists', async (req, res, next) => {
  try {
    const { songId, playlistId } = req.body;
    if (!songId || !playlistId) {
      throw new Error(`error: song not saved`);
    }
    const sql = `
          insert into "PlaylistSongs" ("songId", "playlistId")
          values ($1, $2)
          returning *
          `;
    const params = [songId, playlistId];
    const result = await db.query(sql, params);
    const [videoAdded] = result.rows;
    res.status(201).json(videoAdded);
    console.log('video saved to playlist');
  } catch (error) {
    console.error(error);
  }
});

app.post('/api/display-selected-playlist', async (req, res, next) => {
  try {
    const [Id] = req.body;
    if (!Id) {
      throw new Error(`error: no playlist id received`);
    }
    const sql = `
          select *
          from "PlaylistSongs"
          join "Songs" using ("songId")
          where "playlistId" = $1
          `;
    const params = [Id];
    const result = await db.query(sql, params);
    const playlistSongs = result.rows;
    res.status(201).json(playlistSongs);
  } catch (error) {
    console.error(error);
  }
});

app.get('/api/carousel', async (req, res, next) => {
  try {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=6&key=${process.env.YOUTUBE_API_KEY}`
    );
    if (!response.ok) {
      throw new Error('carousel backend fetch error');
    }
    const data: any = await response.json();
    res.status(201).json(data);
    res.sendStatus(200);
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
