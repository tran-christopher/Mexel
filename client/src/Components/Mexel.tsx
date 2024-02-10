import { Routes, Route, useNavigate } from 'react-router-dom';
import { SignInPage } from './Pages/SignInPage';
import { SignUpPage } from './Pages/SignUpPage';
import { InputPage } from './Pages/InputPage';
import { LeftMenu } from './LeftMenu';
import { SavedSongs } from './Pages/SavedSongs';
import { SavedPlaylists } from './Pages/SavedPlaylists';
import { PlaylistInputPage } from './Pages/PlaylistInputPage';
import { MediaPlayer } from './Pages/MediaPlayer';
import { useState } from 'react';
import { UserProvider, VideoData } from './AppContext';
import { DisplayPlaylists } from './DisplayPlaylist';

export function Mexel() {
  const navigate = useNavigate();
  const [source, setSource] = useState('');
  const [video, setVideo] = useState({});
  const [newPlaylistName, setNewPlaylistName] = useState({});
  const [allSongs, setAllSongs] = useState<VideoData[]>([]);
  const [allPlaylists, setAllPlaylists] = useState([]);
  const [henry, setHenry] = useState(0);
  const [displayPlaylist, setDisplayPlaylist] = useState([]);

  async function getSongAndTitle(linkToConvert: string) {
    try {
      const song = {
        userId: '',
        url: '',
        title: '',
      };
      const userId = localStorage.getItem('user signed in');
      song.userId =
        userId !== null ? userId : 'userId was not captured as expected';
      song.url = linkToConvert;
      const response = await fetch('/api/video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(song),
      });
      if (!response.ok) {
        throw new Error(`fetch error ${response.status}`);
      }
      const data = await response.json();
      setSource(data[0]);
      setVideo(data);
      navigate('/player');
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
      console.log(`Playlist created: ${newPlaylistName}`);
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
      alert(`Video saved!`);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

  async function selectPlaylistToSave(songId) {
    setHenry(songId);
    navigate('/saved-playlists');
    try {
      getAllPlaylists();
    } catch (error) {
      console.error(error);
    }
  }

  async function saveSongToPlaylist(songId, playlistId) {
    try {
      const reqObject = {
        songId,
        playlistId,
      };
      const response = await fetch('/api/saving-to-playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqObject),
      });
      if (!response.ok) {
        throw new Error(`fetch error ${response.status}`);
      }
      const data = await response.json();
      console.log(`Saved to database ${JSON.stringify(data)}`);
      alert(`Saved to playlist!`);
      navigate('/saved-songs');
    } catch (error) {
      console.error(error);
    }
  }

  async function getAllSongs() {
    try {
      setAllSongs([]);
      const userId = localStorage.getItem('user signed in');
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
      console.log(`Saved videos retrieved ${JSON.stringify(data)}`);
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
      if (data) {
        console.log(data);
        console.log(
          `playlists retrieved congratulations! ${JSON.stringify(data)}`
        );
        setAllPlaylists(data);
        console.log(data);
      } else {
        alert('No playlists found');
        navigate('/');
        throw new Error('No playlists found');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function displaySelectedPlaylist(Id) {
    try {
      setDisplayPlaylist([]);
      const response = await fetch('/api/display-selected-playlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: Id,
      });
      if (!response.ok) {
        throw new Error(`fetch error ${response.status}`);
      }
      const data = await response.json();
      setDisplayPlaylist(data);
      navigate('/display-playlist');
    } catch (error) {
      console.error(error);
    }
  }

  const contextValue = { allSongs };
  return (
    <div className="bg-black font-sans">
      <div className="">
        <UserProvider value={contextValue}>
          <Routes>
            <Route
              path="/"
              element={
                <LeftMenu
                  handlePlaylists={getAllPlaylists}
                  handleSongs={getAllSongs}
                  createPlaylist={() => {
                    navigate('/save-playlist');
                  }}
                />
              }>
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route
                path="/player"
                element={
                  <MediaPlayer saveVideo={saveSongAndTitle} url={source} />
                }
              />
              <Route index element={<InputPage onSubmit={getSongAndTitle} />} />
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
                    handleSave={(songId) => {
                      selectPlaylistToSave(songId);
                      console.log(songId);
                    }}
                    allSongsArray={allSongs}
                  />
                }
              />
              <Route
                path="/saved-playlists"
                element={
                  <SavedPlaylists
                    handleDisplay={(Id) => {
                      displaySelectedPlaylist(Id);
                    }}
                    handleSave={(Id) => {
                      saveSongToPlaylist(henry, Id);
                    }}
                    allPlaylistsArray={allPlaylists}
                  />
                }
              />
              <Route
                path="/display-playlist"
                element={
                  <DisplayPlaylists
                    handleSource={(url) => {
                      setSource(url);
                      navigate('/player');
                    }}
                    allSongsArray={displayPlaylist}
                  />
                }
              />
            </Route>
          </Routes>
        </UserProvider>
      </div>
    </div>
  );
}
