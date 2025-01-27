import Link from 'next/link';

const pages = [
  { href: '/', title: 'Home' },
  { href: '/user-list', title: 'User List (jsph)' },
  { href: '/todo', title: 'ToDo List' },
  { href: '/todo-delegation', title: 'ToDo delegation' },
  { href: '/calendar', title: 'Calendar' },
];

export function Header() {
  return <header>
    <nav>
      <ul>
        {pages.map(({ href, title }) =>
          <li key={href}>
            <Link href={href}>{title}</Link>
          </li>)
        }
      </ul>
    </nav>
  </header>
}