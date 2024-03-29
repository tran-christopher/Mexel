type Thumbnails = {
  src: string;
  alt: string;
  srcTwo: string;
  altTwo: string;
  srcThree: string;
  altThree: string;
};

export function Banner({
  src,
  alt,
  srcTwo,
  altTwo,
  srcThree,
  altThree,
}: Thumbnails) {
  return (
    <div className="flex justify-evenly ">
      <img
        style={{
          width: '25%',
          marginBottom: '10px',
        }}
        src={src}
        alt={alt}
      />
      <img
        style={{
          width: '25%',
          marginBottom: '10px',
        }}
        src={srcTwo}
        alt={altTwo}
      />
      <img
        style={{
          width: '25%',
          marginBottom: '10px',
        }}
        src={srcThree}
        alt={altThree}
      />
    </div>
  );
}
