import { useRef, useState } from 'react';

export function TestUseRef() {
  const
    ref = useRef(0),
    [state, setState] = useState(0);
  return <>
    ref.current= {ref.current}
    <button onClick={() => ref.current++}>inc ref.current</button>
    <button onClick={() => setState(Date.now())}>rerender</button>
  </>
}

export function TestUseRef2() {
  const
    ref = useRef(null);
  return <>
    <button ref={ref} onClick={() => alert(JSON.stringify(ref.current.getBoundingClientRect()))}>getBoundingClientRect</button>
  </>
}