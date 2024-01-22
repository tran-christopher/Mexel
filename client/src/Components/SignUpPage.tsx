export function SignUpPage() {
  return (
    <div>
      <label htmlFor="username">Username</label>
      <input type="text" name="username" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" />
      <button type="submit">Sign in</button>
      <p>Don't have an account? Sign up here</p>
    </div>
  );
}
