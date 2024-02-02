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
          <p className="">Paste your link below!</p>
        </div>
        <div className="p-2">
          <input
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
          <button type="submit">Play</button>
        </div>
      </form>
    </div>
  );
}
