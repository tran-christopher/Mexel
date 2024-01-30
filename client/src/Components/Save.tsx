import { useState } from 'react';

type SaveProps = {
  onSave: (songData) => void;
};

export function Save({ onSave }: SaveProps) {
  const [data, setData] = useState([]);

  async function handleSave(event) {
    event.preventDefault();
    const videoToSave = data;
    onSave(videoToSave);
    setData([]);
  }

  return (
    <div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
