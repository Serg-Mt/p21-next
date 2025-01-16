import { useState } from 'react'

export function Input() {
  const
    [value, setValue] = useState('-start-')
  return <>
    <input value={value} onInput={event => setValue(event.target.value)} />
    <button>ok</button>
    {value}
  </>
}