import Link from 'next/link';

const pages = [
  { href: '/', title: 'Home' },
  { href: '/about', title: 'About' },
  { href: '/user-list', title: 'User List (jsph)' },
];

export function Header() {
  return <header>
    <nav>
      <ul>
        {pages.map(({href,title})=>
        <li key={href}>
          <Link href={href}>{title}</Link>
        </li>)
        }
      </ul>
    </nav>
  </header>
}