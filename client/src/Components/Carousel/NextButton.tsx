type NextButtonProp = {
  onClick: () => void;
};

export function NextButton({ onClick }: NextButtonProp) {
  return (
    <button
      className="bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r flex items-center"
      onClick={onClick}>
      &rarr;
    </button>
  );
}
