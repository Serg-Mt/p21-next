import '../global.css';

import { Header } from '../components/Header';

export default function App({ Component, pageProps }) {
  return <>
    <Header />
    <main>
      <Component {...pageProps} />
    </main>
    <footer>
      (c)2025 Я
    </footer>
  </>
}