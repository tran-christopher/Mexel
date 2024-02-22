type PrevButtonProp = {
  onClick: () => void;
};

export function PrevButton({ onClick }: PrevButtonProp) {
  return (
    <button
      className="bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l flex items-center"
      onClick={onClick}>
      &larr;
    </button>
  );
}
