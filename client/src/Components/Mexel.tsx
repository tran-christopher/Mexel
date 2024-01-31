import { Routes, Route, useNavigate } from 'react-router-dom';
import { SignInPage } from './SignInPage';
import { SignUpPage } from './SignUpPage';
import { InputPage } from './InputPage';
import { Save } from './Save';
import { LeftMenu } from './LeftMenu';
import { SavedSongs } from './SavedSongs';
import { SavedPlaylists } from './SavedPlaylists';
import { PlaylistInputPage } from './PlaylistInputPage';
import { MediaPlayer } from './MediaPlayer';
import { useState } from 'react';
import { UserProvider, VideoData } from './AppContext';

export function Mexel() {
  const navigate = useNavigate();
  const [source, setSource] = useState('');
  const [video, setVideo] = useState({});
  const [newPlaylistName, setNewPlaylistName] = useState({});
  const [allSongs, setAllSongs] = useState<VideoData[]>([]);
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
      setNewPlaylistName(data);
      console.log(newPlaylistName);
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

  async function saveSongToPlaylist() {
    try {
    } catch (error) {
      console.error(error);
    }
  }

  async function getAllSongs() {
    try {
      setAllSongs([]);
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
      setAllPlaylists([]);
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

  const contextValue = { allSongs };
  return (
    <UserProvider value={contextValue}>
      <Routes>
        <Route
          path="/"
          element={
            <LeftMenu
              handlePlaylists={getAllPlaylists}
              handleSongs={getAllSongs}
            />
          }>
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/player" element={<MediaPlayer url={source} />} />
          <Route index element={<InputPage onSubmit={getSongAndTitle} />} />
          <Route path="/save" element={<Save onSave={saveSongAndTitle} />} />
          <Route
            path="/save-playlist"
            element={<PlaylistInputPage onSubmit={createPlaylist} />}
          />
          <Route
            path="/saved-songs"
            element={
              <SavedSongs
                handleSource={(url) => {
                  setSource(url);
                  navigate('/player');
                }}
                handleSave={() => {}}
                allSongsArray={allSongs}
              />
            }
          />
          <Route
            path="/saved-playlists"
            element={<SavedPlaylists allPlaylistsArray={allPlaylists} />}
          />
        </Route>
      </Routes>
    </UserProvider>
  );
}
