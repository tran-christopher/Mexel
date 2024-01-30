import { FormEvent, useState } from 'react';

type PlaylistInputPageProps = {
  onSubmit: (newPlaylist) => void;
};

export function PlaylistInputPage({ onSubmit }: PlaylistInputPageProps) {
  const [name, setName] = useState('');

  function handleCreate(event: FormEvent) {
    event.preventDefault();
    const playlistTitle = name;
    onSubmit(playlistTitle);
    setName('');
  }

  return (
    <div>
      <form onSubmit={handleCreate}>
        <p>Create a playlist here</p>
        <input required type="text" placeholder="playlist name here" />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
