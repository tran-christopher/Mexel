import { FormEvent, useState } from 'react';

type InputPageProps = {
  onSubmit: (link: string) => void;
};

export function InputPage({ onSubmit }: InputPageProps) {
  const [url, setUrl] = useState('');

  function handleConvert(event: FormEvent) {
    event.preventDefault();
    const linkToConvert = url;
    onSubmit(linkToConvert);
    setUrl('');
  }

  return (
    <div className="flex flex-col">
      <form onSubmit={handleConvert}>
        <div className="p-2">
          <p className="text-white">Paste your link below!</p>
        </div>
        <div className="p-2">
          <input
            color="black"
            name="link"
            className=""
            required
            type="text"
            placeholder="Your link here"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
        </div>
        <div>
          <button
            type="submit"
            className=" hover:cursor-pointer text-white font-bold py-2 px-4 rounded-full shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 3l14 9-14 9V3z"></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
