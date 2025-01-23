import { memo, useCallback, useRef, useState } from 'react';

class ToDoItem {
  checked = false;
  id = Math.random();
  text;
  constructor(text) {
    Object.assign(this, { text }); // this.text = text
  }

  toggle() {
    const
      clone = this.clone()
    clone.checked = !this.checked;
    return clone;
  }

  clone() {
    return Object.assign(new ToDoItem(this.text), this);
  }
}

export class ToDoList extends Array {
  static isNotEqualId(id) {
    return item => item.id !== id;
  }
  static isEqualId(id) {
    return item => item.id === id;
  }
  addItem(text) {
    return new ToDoList(...this, new ToDoItem(text));
  }
  // Внимание! старые методы( this.map this.filter...) вернут экземпляр ToDoList,
  // но новые ( this.toSorted, this.with ) вернут просто массив (без методов addItem, delItem...)
  delItem(id) {
    return this.filter(ToDoList.isNotEqualId(id)); // return this.filter(item=>item.id !== id)
  }
  toggleChecked(id) {
    const
      isEqualId = ToDoList.isEqualId(id);
    return this.map((item, i) => isEqualId(item) ? item.toggle() : item);
  }
}

const
  Button = memo(function ({ children, onClick }) {
    console.debug('render Button', children);
    return <button onClick={onClick}>{children}</button>
  });


const Item = memo(function ({ item, onDel, onToggle }) {
  console.debug('render Item', item);
  const
    { checked, id, text } = item,
    onClick = useCallback(() => onDel(id), [id]);

  return <li>
    <input type="checkbox" checked={checked} onChange={() => onToggle(id)} />
    {text}
    <Button onClick={onClick}>✖</Button>
    {checked && '✔'}
  </li>
});

const Form = memo(function ({ onAdd }) {
  const
    ref = useRef(null),
    [value, setValue] = useState('-start-'),
    onClick = useCallback(() => onAdd(ref.current), []);
  ref.current = value;
  console.debug('render Form', value);

  return <fieldset>
    <legend>Form</legend>
    <input value={value} onInput={event => setValue(event.currentTarget.value)} />
    <Button onClick={onClick}>➕ add item</Button>
  </fieldset>
});

export function ToDo() {
  const
    [list, setList] = useState(new ToDoList()
      .addItem('дело 1')
      .addItem('дело 2')),
    onDel = useCallback(id => setList(prev => prev.delItem(id)), []),
    onAdd = useCallback(text => setList(prev => prev.addItem(text)), []),
    onToggle = useCallback(id => setList(prev => prev.toggleChecked(id)), []);
  // console.debug('render ToDO', list);
  return <fieldset>
    <legend>ToDo</legend>
    <Form onAdd={onAdd} />
    <List list={list} onDel={onDel} onToggle={onToggle} />
  </fieldset>
}


/**
 * 
 * @param {object} props 
 * @param {ToDoItem[]} props.list
 * @returns {JSX.Element}
 */
function List({ list, onDel, onToggle }) {
  console.debug('render List')
  return <fieldset>
    <legend>List</legend>
    <ol>
      {list.map(item => <Item key={item.id} item={item} onDel={onDel} onToggle={onToggle} />)}
    </ol>
  </fieldset>
}



