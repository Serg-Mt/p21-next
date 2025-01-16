import { useState } from 'react';
import css from './LikeButton.module.css';


export function LikeButton({ color, start = 0, step = 1, big, border }) {
  const
    [likes, setLikes] = useState(+start),
    [bordered, setBordered] = useState(!!border),
    className = [
      css.like,
      big && css.big,
      bordered && css.border,
      'green' === color && css.green
    ].filter(Boolean).join(' ');
  return <button
    className={className}
    onClick={() => setLikes(prev => +step + prev)}
    onContextMenu={event => { event.preventDefault(); setBordered(prev => !prev) }}
  >
    Likes:{likes}
  </button>;
}