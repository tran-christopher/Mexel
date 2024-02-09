type ListSongProps = {
  title: string;
  onClick: () => void;
  onSave: () => void;
};

export function ListSong({ title, onClick, onSave }: ListSongProps) {
  return (
    <div className="flex justify-between">
      <a onClick={onClick}>{title}</a>
      <button
        onClick={onSave}
        className="text-white font-bold py-2 px-4 rounded-full shadow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"></path>
        </svg>
      </button>
    </div>
  );
}
