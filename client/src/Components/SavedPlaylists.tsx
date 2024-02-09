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
      <li
        className="text-left p-2 hover:cursor-pointer"
        key={playlist.playlistId}>
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
    <div className="flex flex-col">
      <div className="self-start">
        <h1 className="text-white text-3xl pt-5 pl-20 pb-10">Playlists</h1>
      </div>
      <div className="self-start">
        <ul className="text-white pl-20">{allPlaylists}</ul>
      </div>
    </div>
  );
}
