type ListSongProps = {
  title: string;
  onClick: () => void;
  onSave: () => void;
};

export function ListSong({ title, onClick, onSave }: ListSongProps) {
  return (
    <div>
      <a onClick={onClick}>{title}</a>
      <button onClick={onSave}>Save to playlist</button>
    </div>
  );
}
