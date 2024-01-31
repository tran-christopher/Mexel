import { ListSong } from './ListSong';
import { useUser } from './useUser';

type Song = {
  songId: number;
  userId: number;
  title: string;
  url: string;
};

type SavedSongsProps = {
  allSongsArray: Song[];
  handleSource: (url) => void;
};

export function SavedSongs({ handleSource }: SavedSongsProps) {
  const { allSongs } = useUser();
  const allSongsTwo = allSongs.map((song) => {
    return (
      <li key={song.songId}>
        <ListSong
          title={song.title}
          onClick={() => {
            handleSource(song.url);
          }}
        />
      </li>
    );
  });
  console.log('allSongs', allSongs);
  return (
    <div>
      <h1>Songs</h1>
      <ul>{allSongsTwo}</ul>
    </div>
  );
}
