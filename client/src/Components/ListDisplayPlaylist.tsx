type ListDisplayPlaylistProps = {
  title: string;
  onClick: () => void;
};

export function ListDisplayPlaylist({
  title,
  onClick,
}: ListDisplayPlaylistProps) {
  return (
    <div className="flex justify-between">
      <a className="hover:underline" onClick={onClick}>
        {title}
      </a>
    </div>
  );
}
