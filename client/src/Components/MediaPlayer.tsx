import { Save } from './Save';
import React from 'react';
import { default as _ReactPlayer } from 'react-player/lazy';
import { ReactPlayerProps } from 'react-player/types/lib';
const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;

type MediaPlayerProps = {
  url: string;
  saveVideo: () => void;
};

export function MediaPlayer({ url, saveVideo }: MediaPlayerProps) {
  return (
    <div>
      <ReactPlayer controls url={url} />
      <Save onSave={saveVideo} />
    </div>
  );
}
