import { ListPlaylist } from './ListPlaylist';

type Playlist = {
  playlistId: number;
  title: string;
  userId: number;
};

type SavedPlaylistsProps = {
  allPlaylistsArray: Playlist[];
  handleDisplay: (Id) => void;
  handleSave: (Id) => void;
};

export function SavedPlaylists({
  allPlaylistsArray,
  handleDisplay,
  handleSave,
}: SavedPlaylistsProps) {
  const allPlaylists = allPlaylistsArray.map((playlist) => {
    return (
      <li key={playlist.playlistId}>
        <ListPlaylist
          title={playlist.title}
          onClick={() => {
            handleDisplay(playlist.playlistId);
          }}
          onSave={() => {
            handleSave(playlist.playlistId);
          }}
        />
      </li>
    );
  });
  return (
    <div>
      <h1>Playlists</h1>
      <ul>{allPlaylists}</ul>
    </div>
  );
}
