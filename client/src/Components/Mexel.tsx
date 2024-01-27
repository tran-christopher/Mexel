import { SignInPage } from './SignInPage';
import { SignUpPage } from './SignUpPage';
import { InputPage } from './InputPage';
import { Save } from './Save';
// import { LeftMenu } from './LeftMenu';
// import { SavedSongs } from './SavedSongs';
// import { SavedPlaylists } from './SavedPlaylists';
import { FormEvent, useState } from 'react';
import React from 'react';
import { default as _ReactPlayer } from 'react-player/lazy';
import { ReactPlayerProps } from 'react-player/types/lib';
const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;

export function Mexel() {
  const [source, setSource] = useState('');
  const [video, setVideo] = useState({});

  async function getSongAndTitle(linkToConvert: string) {
    try {
      const Song = {
        userId: '',
        url: '',
        title: '',
      };
      console.log(`this is the link: ${linkToConvert}`);
      const userId = localStorage.getItem('user signed in');
      Song.userId =
        userId !== null ? userId : 'userId was not captured as expected';
      Song.url = linkToConvert;
      const response = await fetch('/api/video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Song),
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

  function handleSignOut(event: FormEvent) {
    event.preventDefault();
    localStorage.clear();
  }

  return (
    <div>
      <SignUpPage />
      <SignInPage />
      <ReactPlayer url={source} />
      <InputPage onSubmit={getSongAndTitle} />
      <Save onSave={saveSongAndTitle} />
      {/* <LeftMenu />
      <SavedSongs />
      <SavedPlaylists /> */}
      <form onSubmit={handleSignOut}>
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}
