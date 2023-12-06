import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import useLogout from "../hooks/useLogout";
import { useState } from "react";
import MovieList from "../components/movieList";
import * as actions from '../context/movie/actions'
import { useMovieContext } from "../context/movie";
import { useRef } from "react";
import {addtoFavorites} from '../hooks/useFavorites'

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    const props = {};
    console.log(req.session)
    if (user) {
      props.user = req.session.user;
      props.isLoggedIn = true;
    } else {
      props.isLoggedIn = false;
    }
    return {props}
  },
  sessionOptions
);


export default function Search(props) {
  const [search, setSearch] = useState()
  const [movie, setMovie] = useState("")
  const logout = useLogout()
  const router = useRouter()
  const [{movieSearchResults}, dispatch] = useMovieContext()
  const [fetching, setFetching] = useState(false)
  const [previousQuery, setPreviousQuery] = useState()
  const inputRef = useRef()
  const inputDivRef = useRef()
  async function handleSubmit(e) {
    e.preventDefault()
    if (fetching || !movie.trim() || movie === previousQuery) return
    setPreviousQuery(movie)
    setFetching(true)
    const response = await fetch(`http://www.omdbapi.com/?t=${movie}&apikey=f7155445 `)
    const data = await response.json()
    setSearch(data)
    console.log(data)
    dispatch({
      type: actions.SEARCH_FILMS,
      payload:{ id: data.imdbId,
        title: data.Title,
        year: data.Year,
        plot: data.Plot,
        poster_link: data.Poster,
        rated: data.Rated,
        }
    })
    console.log(movieSearchResults)
    setFetching(false)
  }
  async function addToList(){
    const {Title, Year, Rated, Director, Poster, Plot, imdbId} = search
    const movieData = {id: imdbId, title: Title, rated: Rated, year: Year, director: Director, plot: Plot, poster_link: Poster}
    console.log(JSON.stringify(movieData))
    const res = await fetch(`/api/movie/${movieData.title}`, {
        method: 'POST',
        body: JSON.stringify(movieData),
    })
    if (res.status === 200){
        router.replace(router.asPath)
    }
}

  return (
    <div className={styles.container}>
      <Head>
        <title>MovieList Search</title>
        <meta name="description" content="MovieList Search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header isLoggedIn={props.isLoggedIn} username={props?.user?.username} />

      <main className={styles.main}>
        <h1 className={styles.title}>
         {!props.isLoggedIn && "Log in to"} Search a Movie!
        </h1>
        <>
        <form onSubmit={handleSubmit}>
          <input type="text" value={movie} onChange={e => setMovie(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
        {
         fetching
         ? <Loading />
         : movieSearchResults?.length
         ? <MovieList movies={movieSearchResults} />
         : <NoResults
         {...{inputRef, inputDivRef, previousQuery}}
         clearSearch={() => setMovie("")}/>
       }
        {
          search && <>
            <h2>{search.Title}</h2>
            <h3> {search.Year}</h3>
            <p> {search.Rated}</p>
            <p> {search.Plot}</p>
            <img src={search.Poster}/>
            <button onClick={addToList}>Favorites</button>
          </>
        }
      </>
        <div>
        </div>


        <div className={styles.grid}>
          {props.isLoggedIn ? (
            <>
              <Link href="/dashboard" className={styles.card}>
                <h2>Dashboard &rarr;</h2>
                <p>This page is only visible if you are logged in.</p>
              </Link>
              <div
                onClick={logout}
                style={{ cursor: "pointer" }}
                className={styles.card}
              >
                <h2>Logout &rarr;</h2>
                <p>Click here to log out.</p>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.card}>
                <h2>Login &rarr;</h2>
                <p>Visit the login page.</p>
              </Link>

              <Link href="/signup" className={styles.card}>
                <h2>Create Account &rarr;</h2>
                <p>Create an account.</p>
              </Link>
            </>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span> */}
        </a>
      </footer>
    </div>
  );
}

function Loading() {
  return <span className={styles.loading}>Still searching</span>
}

function NoResults({ inputDivRef, inputRef, previousQuery, clearSearch }) {
  function handleLetsSearchClick() {
    inputRef.current.focus()
    if (previousQuery) clearSearch()
  }
  return (
    <div className={styles.noResults}>
      <p><strong>{previousQuery ? `No Movies found for "${previousQuery}"` : "Nothing to see yet"}</strong></p>
      <button onClick={handleLetsSearchClick}>
        {
          previousQuery
          ? `Search again?`
          : `Let's find a movie!`
        }
      </button>
    </div>
  )
}