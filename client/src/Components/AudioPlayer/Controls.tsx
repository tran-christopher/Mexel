import {
  useState,
  useEffect,
  useRef,
  MutableRefObject,
  useCallback,
} from 'react';

// icons
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from 'react-icons/io5';

export function Controls({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
  trackIndex,
  setTrackIndex,
  list,
  setCurrentTrack,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState<number | string>(60);

  const playAnimationRef: MutableRefObject<number | undefined> = useRef();

  const repeat = useCallback(() => {
    console.log('run');
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      '--range-progress',
      `${(progressBarRef.current.value / duration) * 100}%`
    );
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      repeat();
    } else {
      audioRef.current.pause();
      if (playAnimationRef.current !== undefined) {
        cancelAnimationFrame(playAnimationRef.current);
      }
    }
    return () => {
      if (playAnimationRef.current !== undefined) {
        cancelAnimationFrame(playAnimationRef.current);
      }
    };
  }, [isPlaying, audioRef, playAnimationRef, repeat]);

  useEffect(() => {
    if (audioRef) {
      const volumeNumber =
        typeof volume === 'string' ? parseInt(volume, 10) : (volume as number);

      if (!isNaN(volumeNumber)) {
        audioRef.current.volume = volumeNumber / 100;
      }
    }
  }, [volume, audioRef]);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  function handleNext() {
    if (trackIndex >= list.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(list[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(list[trackIndex + 1]);
    }
  }

  function handlePrevious() {
    if (trackIndex === 0) {
      const lastTrackIndex = list.length - 1;
      setTrackIndex(lastTrackIndex);
      setCurrentTrack(list[lastTrackIndex]);
    } else {
      setTrackIndex((prev) => prev - 1);
      setCurrentTrack(list[trackIndex - 1]);
    }
  }

  const skipForward = () => {
    audioRef.current.currentTime += 15;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 15;
  };

  return (
    <div className="controls-wrapper">
      <div className="controls">
        <button onClick={handlePrevious}>
          <IoPlaySkipBackSharp />
        </button>
        <button onClick={skipBackward}>
          <IoPlayBackSharp />
        </button>

        <button onClick={togglePlayPause}>
          {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
        </button>
        <button onClick={skipForward}>
          <IoPlayForwardSharp />
        </button>
        <button onClick={handleNext}>
          <IoPlaySkipForwardSharp />
        </button>
      </div>
      <div className="volume">
        <button>Volume</button>
        <input
          style={{
            background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
          }}
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
      </div>
    </div>
  );
}
