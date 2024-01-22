export function SignInPage() {
  return (
    <div>
      <form>
        <div>
          <h1>Mexel</h1>
          <button type="button">Sign up</button>
          <button type="button">Log in</button>
        </div>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <button type="submit">Sign in</button>
        <p>Don't have an account? Sign up here</p>
      </form>
    </div>
  );
}
