import { list } from './TestAudiosAndImages/tracks';

export function TestPlayer({ source }) {
  return (
    <div>
      <audio src={source} controls></audio>
      <img src={list[0].thumbnail} />
    </div>
  );
}
