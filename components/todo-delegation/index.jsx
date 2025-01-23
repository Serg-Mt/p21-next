import { memo, useRef, useState } from 'react';
import { ToDoList } from '../todo';

const
  TOGGLE_CHECKBOX_ACTION = 'toggle-checkbox',
  DELETE_ACTION = 'del',
  ADD_ACTION = 'add';

const
  Button = memo(function Button({ children, action }) {
    console.debug('render Button', children);
    return <button data-action={action}>{children}</button>
  });


const Item = memo(function Item({ item }) {
  console.debug('render Item', item);
  const
    { checked, id, text } = item;

  return <li data-id={id}>
    <input readOnly data-action={TOGGLE_CHECKBOX_ACTION} type="checkbox" checked={checked} />
    {text}
    <Button action={DELETE_ACTION}>✖</Button>
    {checked && '✔'}
  </li>
});

const Form = memo(function Form({ inputRef }) {
  console.debug('render Form', inputRef?.current?.value);
  return <fieldset>
    <legend>Form</legend>
    <input ref={inputRef} />
    <Button action={ADD_ACTION}>➕ add item</Button>
  </fieldset>
});


export function ToDo() {
  const
    inputRef = useRef(null),
    [list, setList] = useState(new ToDoList()
      // .addItem('дело 1')
      // .addItem('дело 2')
    ),
    onClick = event => {
      const
        action = event.target.closest('[data-action]')?.dataset.action,
        id = +event.target.closest('[data-id]')?.dataset.id;
      switch (action) {
        case TOGGLE_CHECKBOX_ACTION:
          setList(prev => prev.toggleChecked(id));
          return;
        case ADD_ACTION:
          setList(prev => prev.addItem(inputRef?.current?.value || 'ooops'));
          return;
        case DELETE_ACTION:
          setList(prev => prev.delItem(id));
          return;
      }
    };

  // console.debug('render ToDO', list);
  return <fieldset onClick={onClick}>
    <legend>ToDo</legend>
    <Form inputRef={inputRef} />
    <List list={list} />
  </fieldset>
}

function List({ list }) {
  console.debug('render List');
  return <fieldset>
    <legend>List</legend>
    <ol>
      {list.map(item => <Item key={item.id} item={item} />)}
    </ol>
  </fieldset>
}