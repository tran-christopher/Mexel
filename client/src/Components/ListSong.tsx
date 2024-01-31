type ListSongProps = {
  title: string;
  onClick: () => void;
};

export function ListSong({ title, onClick }: ListSongProps) {
  return (
    <div>
      <a onClick={onClick}>{title}</a>
      <button>Save to playlist</button>
    </div>
  );
}
