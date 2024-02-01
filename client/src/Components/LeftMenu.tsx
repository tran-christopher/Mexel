import { Link, Outlet } from 'react-router-dom';

type LeftMenuProps = {
  handleSongs: () => void;
  handlePlaylists: () => void;
};

export function LeftMenu({ handleSongs, handlePlaylists }: LeftMenuProps) {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/sign-in">Login</Link>
      <Link to="/sign-up">Sign up</Link>
      <div>
        <p>Library</p>
        <Link onClick={handleSongs} to="/saved-songs">
          All songs
        </Link>
        <Link onClick={handlePlaylists} to="/saved-playlists">
          Playlists
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
