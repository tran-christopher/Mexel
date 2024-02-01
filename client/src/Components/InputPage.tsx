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
    <div className="">
      <form onSubmit={handleConvert}>
        <p>Paste your link below!</p>
        <input
          className=""
          required
          type="text"
          placeholder="Your link here"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <button type="submit">Convert</button>
      </form>
    </div>
  );
}
