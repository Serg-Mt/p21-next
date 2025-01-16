import { useState } from 'react';

export function StateDiff() {
  const
    [state1, setState1] = useState(0),
    [state2, setState2] = useState(['']);
  console.log('StateDiff render', state1, state2);
  return <fieldset>
    <legend>StateDiff</legend>
    state1 = {state1}<br />
    <button onClick={() => {
      const s = [...state2, 'x'];// state2.concat('x');
      setState2(s);
    }}>+</button>
    <button onClick={() => {
      const [, ...s] = state2;
      setState2(s);
    }}>-</button>
    state2 = {state2.join('')} <br />
    {/* {Math.random()}<br />
    {Date.now()}<br /> */}
    <button onClick={() => setState1(100)}>click</button>
  </fieldset>
}