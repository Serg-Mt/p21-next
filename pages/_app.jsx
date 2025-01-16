import { Header } from '../components/Header';

export default function App({ Component, pageProps }) {
  return <>
    <Header />
    <Component {...pageProps} />
    <hr />
    <footer>
      (c)2025 Я
    </footer>
  </>
}