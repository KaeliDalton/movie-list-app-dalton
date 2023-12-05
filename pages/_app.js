import { MovieProvider } from '../context/movie'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
  <MovieProvider>
    <Component {...pageProps} />
    </MovieProvider>
  )
}

export default MyApp
