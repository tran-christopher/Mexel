import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export function SignInPage() {
  const navigate = useNavigate();
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData.entries());
      const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };
      const response = await fetch('/api/sign-in', request);
      if (!response.ok) {
        throw new Error(`fetch error ${response.status}`);
      }
      const user = await response.json();
      localStorage.setItem('user signed in', `${user.user.userId}`);
      console.log(`Signed in: ${JSON.stringify(user)}`);
      alert('You are now signed in!');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div>
        <h1>Mexel</h1>
        <button onClick={() => navigate('/sign-up')} type="button">
          Sign up
        </button>
        <button onClick={() => navigate('/sign-in')} type="button">
          Log in
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input required type="text" name="username" />
        <label htmlFor="password">Password</label>
        <input required type="password" name="password" />
        <button type="submit">Sign in</button>
        <p>
          Don't have an account?
          <a
            onClick={() => {
              navigate('/sign-up');
            }}>
            Sign up here
          </a>
        </p>
      </form>
    </div>
  );
}
