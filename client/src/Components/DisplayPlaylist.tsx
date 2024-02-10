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
      <li key={song.songId}>
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
    <div>
      <ul>{songsToDisplay}</ul>
    </div>
  );
}
