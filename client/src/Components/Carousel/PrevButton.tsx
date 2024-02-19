type PrevButtonProp = {
  onClick: () => void;
};

export function PrevButton({ onClick }: PrevButtonProp) {
  return <button onClick={onClick}>Prev</button>;
}
