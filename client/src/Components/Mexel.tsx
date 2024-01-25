import { SignInPage } from './SignInPage';
import { SignUpPage } from './SignUpPage';
import { TestPlayer } from './TestPlayer';
import { InputPage } from './InputPage';
import { useState } from 'react';
import { SoundCloudStream, YouTubeStream } from 'play-dl';

export function Mexel() {
  const [source, setSource] = useState<YouTubeStream | SoundCloudStream>();

  async function handleTest() {
    try {
      const response = await fetch('/api/stream', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`fetch error didn't work ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getSong(linkToConvert: string) {
    try {
      const response = await fetch('/api/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(linkToConvert),
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

  return (
    <div>
      <SignUpPage />
      <SignInPage />
      <TestPlayer source={source} />
      <InputPage onSubmit={getSong} />
      <form onSubmit={handleTest}>
        <button>Test</button>
      </form>
    </div>
  );
}
