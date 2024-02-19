import { Save } from '../Components/Save';
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
    <div className="flex flex-col items-center">
      <div className="">
        <ReactPlayer controls url={url} />
      </div>
      <div className="text-white">
        <Save onSave={saveVideo} />
      </div>
    </div>
  );
}
