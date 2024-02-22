type Thumbnail = {
  src: string;
  alt: string;
};

export function Banner({ src, alt }: Thumbnail) {
  return (
    <img
      style={{
        width: '50%',
        marginBottom: '10px',
      }}
      src={src}
      alt={alt}
    />
  );
}
