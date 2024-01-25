import { useRef, useState } from 'react';
import './AudioPlayer.css';
import { Controls } from './Controls';
import { DisplayTrack } from './DisplayTrack';
import { ProgressBar } from './ProgressBar';
import { list } from './TestAudios/tracks';

export function AudioPlayer() {
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(trackIndex);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef();
  const progressBarRef = useRef();

  return (
    <div className="audio-player">
      <div className="inner">
        <DisplayTrack
          {...{ currentTrack, audioRef, setDuration, progressBarRef }}
        />
        <Controls
          {...{
            audioRef,
            progressBarRef,
            duration,
            setTimeProgress,
            trackIndex,
            setTrackIndex,
            list,
            setCurrentTrack,
          }}
        />
        <ProgressBar
          {...{ progressBarRef, audioRef, timeProgress, duration }}
        />
      </div>
    </div>
  );
}
