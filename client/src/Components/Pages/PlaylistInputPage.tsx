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
    <form onSubmit={handleCreate}>
      <div className="flex flex-col">
        <div className="p-2">
          <p className="text-white">Give your playlist a name below!</p>
        </div>
        <div className="p-2">
          <input
            color="black"
            required
            type="text"
            placeholder="playlist name here"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <button
            className=" hover:cursor-pointer text-white font-bold py-2 px-4 rounded-full shadow"
            type="submit">
            Create
          </button>
        </div>
      </div>
    </form>
  );
}
