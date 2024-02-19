import { useCallback, useEffect, useState } from 'react';
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
  const handleCarousel = useCallback(() => {
    if (index === 5) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }, [index]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('running');
      handleCarousel();
    }, 2500);
    return () => clearInterval(interval);
  }, [handleCarousel]);

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
        height: '70vh',
        width: '100%',
        backgroundColor: 'white',
      }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '10%',
        }}>
        <PrevButton onClick={handlePrev} />
        <Banner src={images[index].src} alt={images[index].alt} />
        <NextButton onClick={handleCarousel} />
      </div>
    </div>
  );
}
