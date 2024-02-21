import { useState } from 'react';
import { Banner } from './Banner';
import { NextButton } from './NextButton';
import { PrevButton } from './PrevButton';

type Props = {
  images: string[];
};

export function CarouselWrapper({ images }: Props) {
  const [index, setIndex] = useState(0);

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
        <Banner src={images[index]} alt="error loading thumbnail" />
        <NextButton onClick={handleNext} />
      </div>
    </div>
  );
}
