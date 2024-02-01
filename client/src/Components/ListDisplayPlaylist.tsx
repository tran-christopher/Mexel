type ListDisplayPlaylistProps = {
  title: string;
  onClick: () => void;
};

export function ListDisplayPlaylist({
  title,
  onClick,
}: ListDisplayPlaylistProps) {
  return (
    <div>
      <a onClick={onClick}>{title}</a>
    </div>
  );
}
