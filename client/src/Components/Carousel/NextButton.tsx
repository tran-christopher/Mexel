type NextButtonProp = {
  onClick: () => void;
};

export function NextButton({ onClick }: NextButtonProp) {
  return <button onClick={onClick}>Next</button>;
}
