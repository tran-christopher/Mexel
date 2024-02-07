import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export function SignOutPage() {
  const navigate = useNavigate();
  function handleSignOut(event: FormEvent) {
    event.preventDefault();
    localStorage.clear();
    alert('You are now signed out');
    navigate('/');
  }
  return (
    <button
      onClick={handleSignOut}
      className={
        localStorage.getItem('user signed in')
          ? 'p-2 hover:text-blue-600'
          : 'hidden'
      }>
      {' '}
      Sign out
    </button>
  );
}
