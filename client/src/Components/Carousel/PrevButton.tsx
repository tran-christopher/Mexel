type PrevButtonProp = {
  onClick: () => void;
};

export function PrevButton({ onClick }: PrevButtonProp) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l flex items-center"
      onClick={onClick}>
      &larr;
    </button>
  );
}
