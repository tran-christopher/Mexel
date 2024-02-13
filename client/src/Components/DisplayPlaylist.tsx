import { ListDisplayPlaylist } from './ListDisplayPlaylist';
import { Song } from './Pages/SavedSongs';

export type DisplayPlaylistsProps = {
  allSongsArray: Song[];
  handleSource: (url) => void;
};

export function DisplayPlaylists({
  allSongsArray,
  handleSource,
}: DisplayPlaylistsProps) {
  console.log(allSongsArray);
  const songsToDisplay = allSongsArray.map((song) => {
    return (
      <li className="text-left p-2 hover:cursor-pointer" key={song.songId}>
        <ListDisplayPlaylist
          title={song.title}
          onClick={() => {
            handleSource(song.url);
          }}
        />
      </li>
    );
  });
  return (
    <div className="flex flex-col">
      <div className="self-start">
        <h1 className="text-white text-3xl pl-20 pb-10">Playlist Videos</h1>
      </div>
      <div className="self-start">
        <ul className="text-white pl-20">{songsToDisplay}</ul>
      </div>
    </div>
  );
}
