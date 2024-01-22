import { FormEvent, useState } from 'react';

export function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(`Username: ${username} Password: ${password}`);
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
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
          name="username"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          name="password"
        />
        <button type="submit">Sign in</button>
        <p>Don't have an account? Sign up here</p>
      </form>
    </div>
  );
}
