type ListPlaylistProps = {
  title: string;
  onClick: () => void;
  onSave: () => void;
};

export function ListPlaylist({ title, onClick, onSave }: ListPlaylistProps) {
  return (
    <div className="flex justify-between">
      <a onClick={onClick}>{title}</a>
      <button
        onClick={onSave}
        className="flex items-center justify-center h-6 w-6 bg-green-400 hover:bg-blue-700 text-white font-bold rounded-full shadow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
    </div>
  );
}
