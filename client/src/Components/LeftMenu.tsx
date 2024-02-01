import { Link, Outlet } from 'react-router-dom';

type LeftMenuProps = {
  handleSongs: () => void;
  handlePlaylists: () => void;
};

export function LeftMenu({ handleSongs, handlePlaylists }: LeftMenuProps) {
  return (
    <div>
      <div className="flex">
        <div className="">
          <h1 className="">Mexel</h1>
        </div>
        <div className="">
          <Link to="/">Home</Link>
          <Link to="/sign-in">Login</Link>
          <Link to="/sign-up">Sign up</Link>
        </div>
      </div>

      <p>
        Library
        <Link onClick={handleSongs} to="/saved-songs">
          All songs
        </Link>
        <Link onClick={handlePlaylists} to="/saved-playlists">
          Playlists
        </Link>
      </p>

      <Outlet />
    </div>
  );
}
