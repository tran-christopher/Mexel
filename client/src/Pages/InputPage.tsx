import { FormEvent, useState } from 'react';
import { CarouselWrapper } from '../Components/Carousel/CarouselWrapper';

type InputPageProps = {
  onSubmit: (link: string) => void;
};

const testImages = [
  {
    src: '/images/image 1.jpg',
    alt: 'image 1',
  },
  {
    src: '/images/image 2.jpg',
    alt: 'image 2',
  },
  {
    src: '/images/image 3.jpg',
    alt: 'image 3',
  },
  {
    src: '/images/image 4.jpg',
    alt: 'image 4',
  },
  {
    src: '/images/image 7.webp',
    alt: 'image 7',
  },
  {
    src: '/images/image 6.jpg',
    alt: 'image 6',
  },
];

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
      <CarouselWrapper images={testImages} />
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
