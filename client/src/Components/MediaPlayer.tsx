import React from 'react';
import { default as _ReactPlayer } from 'react-player/lazy';
import { ReactPlayerProps } from 'react-player/types/lib';
const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;

type MediaPlayerProps = {
  url: string;
};

export function MediaPlayer({ url }: MediaPlayerProps) {
  return <ReactPlayer controls url={url} />;
}
