import { ListSong } from './ListSong';
import { useUser } from './useUser';

export type Song = {
  songId: number;
  userId: number;
  title: string;
  url: string;
};

export type SavedSongsProps = {
  allSongsArray: Song[];
  handleSource: (url) => void;
  handleSave: (Id) => void;
};

export function SavedSongs({ handleSource, handleSave }: SavedSongsProps) {
  const { allSongs } = useUser();
  const allSongsTwo = allSongs.map((song) => {
    return (
      <li key={song.songId}>
        <ListSong
          title={song.title}
          onClick={() => {
            handleSource(song.url);
          }}
          onSave={() => {
            handleSave(song.songId);
          }}
        />
      </li>
    );
  });
  return (
    <div>
      <h1>Songs</h1>
      <ul>{allSongsTwo}</ul>
    </div>
  );
}
