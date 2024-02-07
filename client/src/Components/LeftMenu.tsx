import { Link, Outlet } from 'react-router-dom';
import { SignOutPage } from './SignOutPage';

type LeftMenuProps = {
  handleSongs: () => void;
  handlePlaylists: () => void;
};

export function LeftMenu({ handleSongs, handlePlaylists }: LeftMenuProps) {
  return (
    <div className="flex">
      {/* left panel */}
      <div className="flex text-white flex-col bg-black justify-center h-screen w-1/3">
        <div className="self-start">
          <h1 className="p-5 text-3xl">Mexel</h1>
        </div>
        <div className="flex flex-col h-full w-full justify-evenly">
          <div className="self-center flex flex-col">
            <Link className="p-2 hover:text-blue-600" to="/">
              Home
            </Link>
            <SignOutPage />
            <Link
              className={
                localStorage.getItem('user signed in')
                  ? 'hidden'
                  : 'p-2 hover:text-blue-600'
              }
              to="/sign-in">
              Login
            </Link>
            <Link
              className={
                localStorage.getItem('user signed in')
                  ? 'hidden'
                  : 'p-2 hover:text-blue-600'
              }
              to="/sign-up">
              Sign up
            </Link>
          </div>
          <div className="self-start flex flex-col">
            <p className="pl-5 text-xl">Library</p>
          </div>
          <div className="self-center flex flex-col">
            <Link
              className="p-1 hover:text-blue-600"
              onClick={handleSongs}
              to="/saved-songs">
              All videos
            </Link>
            <Link
              className="p-1 hover:text-blue-600"
              onClick={handlePlaylists}
              to="/saved-playlists">
              Playlists
            </Link>
          </div>
        </div>
      </div>
      {/* Right panel */}
      <div className="bg-gray-900 flex flex-col justify-center w-full">
        <Outlet />
      </div>
    </div>
  );
}
