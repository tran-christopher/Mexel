import { FormEvent } from 'react';

export function SignUpPage() {
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
        <button type="submit">Sign Up</button>
        <p>Already have an account? Sign in here</p>
      </form>
    </div>
  );
}
