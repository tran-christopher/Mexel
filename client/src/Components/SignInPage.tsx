import { FormEvent } from 'react';

export function SignInPage() {
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
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div>
        <h1>Mexel</h1>
        <button type="button">Sign up</button>
        <button type="button">Log in</button>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input required type="text" name="username" />
        <label htmlFor="password">Password</label>
        <input required type="password" name="password" />
        <button type="submit">Sign in</button>
        <p>Don't have an account? Sign up here</p>
      </form>
    </div>
  );
}
