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
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <div className="p-2">
          <label className="text-white pr-28" htmlFor="username">
            Username
          </label>
        </div>
        <div className="">
          <input placeholder="username" required type="text" name="username" />
        </div>
        <div className="p-2">
          <label className="text-white pr-28" htmlFor="password">
            Password
          </label>
        </div>
        <div>
          <input
            placeholder="password"
            required
            type="password"
            name="password"
          />
        </div>
        <div className="text-white p-2">
          <button className="hover:text-blue-600" type="submit">
            Sign in
          </button>
          <p className="p-10">
            Don't have an account?
            <a
              className="block hover:cursor-pointer hover:text-blue-600"
              onClick={() => {
                navigate('/sign-up');
              }}>
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </form>
  );
}
