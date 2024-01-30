import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export function SignOutPage() {
  const navigate = useNavigate();
  function handleSignOut(event: FormEvent) {
    event.preventDefault();
    localStorage.clear();
    navigate('/');
  }
  return (
    <form onSubmit={handleSignOut}>
      <button type="submit">Sign out</button>
    </form>
  );
}
