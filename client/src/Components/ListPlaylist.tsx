type ListPlaylistProps = {
  title: string;
  onClick: () => void;
  onSave: () => void;
};

export function ListPlaylist({ title, onClick, onSave }: ListPlaylistProps) {
  return (
    <div>
      <a onClick={onClick}>{title}</a>
      <button onClick={onSave}>Save to playlist</button>
    </div>
  );
}
