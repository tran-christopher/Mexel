type Playlist = {
  playlistId: number;
  title: string;
  userId: number;
};

type SavedPlaylistsProps = {
  allPlaylistsArray: Playlist[];
};

export function SavedPlaylists({ allPlaylistsArray }: SavedPlaylistsProps) {
  const allPlaylists = allPlaylistsArray.map((playlist) => {
    return <li key={playlist.playlistId}>{playlist.title}</li>;
  });
  return (
    <div>
      <h1>Playlists</h1>
      <ul>{allPlaylists}</ul>
    </div>
  );
}
