import { useState, useEffect } from 'react';
import { Banner } from './Banner';
import { NextButton } from './NextButton';
import { PrevButton } from './PrevButton';

type Image = {
  src: string;
  alt: string;
};

type Props = {
  images: Image[];
};

export function CarouselWrapper({ images }: Props) {
  const [index, setIndex] = useState(0);
  // const thumbnails: string[] = [];

  useEffect(() => {
    async function carousel() {
      try {
        const response = await fetch('/api/carousel');
        if (!response.ok) {
          throw new Error(`carousel frontend fetch error`);
        }
        const data = await response.json();
        console.log(JSON.stringify(data));
      } catch (error) {
        console.error(error);
      }
    }
    carousel();
  }, []);

  function handleNext() {
    if (index === 5) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }

  function handlePrev() {
    if (index === 0) {
      setIndex(5);
    } else {
      setIndex(index - 1);
    }
  }

  return (
    <div
      style={{
        height: '50%',
        width: '100%',
        backgroundColor: 'rgb(17,24,39)',
      }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <PrevButton onClick={handlePrev} />
        <Banner src={images[index].src} alt={images[index].alt} />
        <NextButton onClick={handleNext} />
      </div>
    </div>
  );
}
