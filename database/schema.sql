set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "Users" (
  "username" text,
  "password" text,
  "userId" serial PRIMARY KEY
);

CREATE TABLE "Songs" (
  "songId" serial PRIMARY KEY,
  "userId" integer,
  "title" text,
  "duration" integer
);

CREATE TABLE "Playlists" (
  "playlistId" serial PRIMARY KEY,
  "title" text,
  "userId" integer
);

CREATE TABLE "PlaylistSongs" (
  "songId" integer,
  "playlistId" integer
);

ALTER TABLE "Songs" ADD FOREIGN KEY ("userId") REFERENCES "Users" ("userId");

ALTER TABLE "Playlists" ADD FOREIGN KEY ("userId") REFERENCES "Users" ("userId");

ALTER TABLE "PlaylistSongs" ADD FOREIGN KEY ("songId") REFERENCES "Songs" ("songId");

ALTER TABLE "PlaylistSongs" ADD FOREIGN KEY ("playlistId") REFERENCES "Playlists" ("playlistId");
