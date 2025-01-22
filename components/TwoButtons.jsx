import { useState } from 'react'

export function TwoButton() {
  const
    [counter, setCounter] = useState(111);
  return <fieldset>
    <legend>TwoButton</legend>
    1:<Button counter={counter} onClick={() => setCounter(prev => 1 + prev)} /><br />
    2:<Button counter={counter} onClick={() => setCounter(prev => -1 + prev)} /><br />
    <hr />
    <Inc counter={counter} callBack={result => setCounter(prev => result + prev)} />
    <Dec counter={counter} callBack={result => setCounter(prev => result + prev)}/>
  </fieldset>
}

function Button({ counter, onClick, op }) {
  return <button onClick={onClick}>
    counter:{counter}
  </button>
}

function Inc({ counter, callBack }) {
  return <button onClick={() => callBack(+1)}>
    ➕counter:{counter}
  </button>
}

function Dec({ counter, callBack }) {
  return <button onClick={() => callBack(-1)}>
    ➖counter:{counter}
  </button>
}
