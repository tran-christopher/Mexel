import { SignInPage } from './SignInPage';
import { SignUpPage } from './SignUpPage';
import { InputPage } from './InputPage';
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

  async function getSong(linkToConvert: string) {
    try {
      console.log(`this is the link: ${linkToConvert}`);
      console.log(typeof linkToConvert);
      const response = await fetch('/api/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: linkToConvert,
      });
      if (!response.ok) {
        throw new Error(`fetch error ${response.status}`);
      }
      const data = await response.json();
      setSource(data);
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
      <InputPage onSubmit={getSong} />
      {/* <LeftMenu />
      <SavedSongs />
      <SavedPlaylists /> */}
      <form onSubmit={handleSignOut}>
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}
