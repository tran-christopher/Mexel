import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type PlaylistInputPageProps = {
  onSubmit: (newPlaylist) => void;
};

export function PlaylistInputPage({ onSubmit }: PlaylistInputPageProps) {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  function handleCreate(event: FormEvent) {
    event.preventDefault();
    const playlistTitle = name;
    onSubmit(playlistTitle);
    setName('');
    navigate('/saved-playlists');
  }

  return (
    <div>
      <form onSubmit={handleCreate}>
        <p>Create a playlist here</p>
        <input
          required
          type="text"
          placeholder="playlist name here"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
