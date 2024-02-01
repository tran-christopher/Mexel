import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export function SignUpPage() {
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
      const response = await fetch('/api/sign-up', request);
      if (!response.ok) {
        throw new Error(`fetch error ${response.status}`);
      }
      const user = await response.json();
      console.log(`Registered: ${JSON.stringify(user)}`);
    } catch (error) {
      console.error(error);
    }
    navigate('/sign-in');
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
        <button type="submit">Sign Up</button>
        <p>
          Already have an account?
          <a
            onClick={() => {
              navigate('/sign-in');
            }}>
            Sign in here
          </a>
        </p>
      </form>
    </div>
  );
}
