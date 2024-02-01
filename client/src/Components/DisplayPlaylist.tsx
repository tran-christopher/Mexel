export type PlaylistSong = {
  songId: number;
  playlistId: number;
};

type DisplayPlaylistsProps = {
  songsToDisplayArray: PlaylistSong[];
};

export function DisplayPlaylists({
  songsToDisplayArray,
}: DisplayPlaylistsProps) {
  console.log(songsToDisplayArray);
  const songsToDisplay = songsToDisplayArray.map((song) => {
    return <li key={song.songId}>hello{song.songId}</li>;
  });
  return (
    <div>
      <ul>{songsToDisplay}</ul>
    </div>
  );
}
