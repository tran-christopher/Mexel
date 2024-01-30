import { SignInPage } from './SignInPage';
import { SignUpPage } from './SignUpPage';
import { InputPage } from './InputPage';
import { Save } from './Save';
// import { LeftMenu } from './LeftMenu';
import { SavedSongs } from './SavedSongs';
import { SavedPlaylists } from './SavedPlaylists';
import { FormEvent, useState } from 'react';
import React from 'react';
import { default as _ReactPlayer } from 'react-player/lazy';
import { ReactPlayerProps } from 'react-player/types/lib';
import { PlaylistInputPage } from './PlaylistInputPage';
const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;

export function Mexel() {
  const [source, setSource] = useState('');
  const [video, setVideo] = useState({});
  const [playlistName, setPlaylistName] = useState({});
  const [allSongs, setAllSongs] = useState([]);
  const [allPlaylists, setAllPlaylists] = useState([]);

  async function getSongAndTitle(linkToConvert: string) {
    try {
      const song = {
        userId: '',
        url: '',
        title: '',
      };
      console.log(`this is the link: ${linkToConvert}`);
      const userId = localStorage.getItem('user signed in');
      song.userId =
        userId !== null ? userId : 'userId was not captured as expected';
      song.url = linkToConvert;
      const response = await fetch('/api/video', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(song),
      });
      if (!response.ok) {
        throw new Error(`fetch error ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setSource(data[0]);
      setVideo(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function createPlaylist(playlistName: string) {
    try {
      const playlist = {
        title: '',
        userId: '',
      };
      const userId = localStorage.getItem('user signed in');
      playlist.userId =
        userId !== null ? userId : 'userId was not captured as expected';
      playlist.title = playlistName;
      console.log(`this is the playlist name ${JSON.stringify(playlist)}`);
      const response = await fetch('/api/create-playlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playlist),
      });
      if (!response.ok) {
        throw new Error(`fetch error ${response.status}`);
      }
      const data = await response.json();
      setPlaylistName(data);
      console.log(playlistName);
    } catch (error) {
      console.error(error);
    }
  }

  async function saveSongAndTitle() {
    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(video),
      });
      if (!response.ok) {
        throw new Error(`fetch error ${response.status}`);
      }
      const data = await response.json();
      console.log(`video saved successfully! ${data}`);
    } catch (error) {
      console.error(error);
    }
  }

  async function getAllSongs() {
    try {
      const userId = localStorage.getItem('user signed in');
      console.log(userId);
      console.log(typeof userId);
      const response = await fetch('/api/get-all-songs', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: userId,
      });
      if (!response.ok) {
        throw new Error(`fetch error ${response.status}`);
      }
      const data = await response.json();
      console.log(`songs retrieved, wowow! ${JSON.stringify(data)}`);
      setAllSongs(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getAllPlaylists() {
    try {
      const userId = localStorage.getItem('user signed in');
      const response = await fetch('/api/get-all-playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: userId,
      });
      if (!response.ok) {
        throw new Error(`fetch error ${response.status}`);
      }
      const data = await response.json();
      console.log(
        `playlists retrieved congratulations! ${JSON.stringify(data)}`
      );
      setAllPlaylists(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleSignOut(event: FormEvent) {
    event.preventDefault();
    localStorage.clear();
  }

  return (
    <div>
      <SignUpPage />
      <SignInPage />
      <ReactPlayer controls url={source} />
      <InputPage onSubmit={getSongAndTitle} />
      <Save onSave={saveSongAndTitle} />
      <PlaylistInputPage onSubmit={createPlaylist} />
      {/* /* <LeftMenu /> */}
      <form onSubmit={handleSignOut}>
        <button type="submit">Sign out</button>
      </form>
      <SavedSongs allSongsArray={allSongs} />
      <SavedPlaylists allPlaylistsArray={allPlaylists} />
    </div>
  );
}
