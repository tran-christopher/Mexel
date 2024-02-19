import { ListSong } from '../ListSong';
import { useUser } from '../useUser';

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
      <li className="text-left p-2 hover:cursor-pointer" key={song.songId}>
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
    <div className="flex flex-col">
      <div className="self-start">
        <h1 className="text-white text-3xl pt-5 pl-20 pb-10">Videos</h1>
      </div>
      <div className="self-start">
        <ul className="text-white pl-20">{allSongsTwo}</ul>
      </div>
    </div>
  );
}
