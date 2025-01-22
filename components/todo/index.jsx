import { useState } from 'react';

class ToDoItem {
  checked = false;
  id = Math.random();
  text;
  constructor(text) {
    Object.assign(this, { text }); // this.text = text
  }

  toggle() {
    this.checked = !this.checked;
    return this;
  }
}

class ToDoList extends Array {
  static isNotEqualId(id) {
    return item => item.id !== id
  }
  static isEqualId(id) {
    return item => item.id === id
  }
  addItem(text) {
    return new ToDoList(...this, new ToDoItem(text));
  }
  delItem(id) {
    return this.filter(ToDoList.isNotEqualId(id)) // return this.filter(item=>item.id !== id)
  }
  toggleChecked(id) {
    const
      isEqualId = ToDoList.isEqualId(id);
    return this.map((item, i) => isEqualId(item) ? item.toggle() : item)
  }
}

export function ToDo() {
  const
    [list, setList] = useState(new ToDoList()
      .addItem('дело 1')
      .addItem('дело 2')),
    onDel = id => setList(list.delItem(id)),
    onAdd = text => setList(list.addItem(text)),
    onToggle = id => setList(list.toggleChecked(id));
  // console.debug('render ToDO', list);
  return <fieldset>
    <legend>ToDo</legend>
    <Form onAdd={onAdd} />
    <List list={list} onDel={onDel} onToggle={onToggle} />
  </fieldset>
}

function Form({ onAdd }) {
  console.debug('render Form');
  const
    [value, setValue] = useState('-start-'),
    onClick = () => onAdd(value);
  return <fieldset>
    <legend>Form</legend>
    <input value={value} onInput={event => setValue(event.currentTarget.value)} />
    <Button onClick={onClick}>➕ add item</Button>
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

/**
 * 
 * @param {object} props 
 * @param {ToDoItem} props.item
 * @returns {JSX.Element}
 */
function Item({ item, onDel, onToggle }) {
  console.debug('render Item', item);
  const
    { checked, id, text } = item;
  return <li>
    <input type="checkbox" checked={checked} onChange={() => onToggle(id)} />
    {text}
    <Button onClick={() => onDel(id)}>✖</Button>
    {checked && '✔'}
  </li>
}

function Button({ children, onClick }) {
  console.debug('render Button');
  return <button onClick={onClick}>{children}</button>
}