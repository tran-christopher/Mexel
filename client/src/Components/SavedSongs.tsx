type Song = {
  songId: number;
  userId: number;
  title: string;
  url: string;
};

type SavedSongsProps = {
  allSongsArray: Song[];
};

export function SavedSongs({ allSongsArray }: SavedSongsProps) {
  const allSongs = allSongsArray.map((song) => {
    return (
      <li key={song.songId}>
        {song.title}
        <button>Save to playlist</button>
      </li>
    );
  });
  return (
    <div>
      <h1>Songs</h1>
      <ul>{allSongs}</ul>
    </div>
  );
}
