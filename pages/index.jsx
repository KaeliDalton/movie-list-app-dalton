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
import { getMovie } from "../util/movie";


export async function getServerSideProps({query}) {
  const props = {}
  if (query.q){
    props.movie = await getMovie(query.q)
  }
  return { props }
}


export default function Search({movie}) {
  // const [search, setSearch] = useState()
  const [query, setQuery] = useState("")
  const logout = useLogout()
  const router = useRouter()
  // const [{movieSearchResults}, dispatch] = useMovieContext()
  // const [fetching, setFetching] = useState(false)
  // const [previousQuery, setPreviousQuery] = useState()
  // const inputRef = useRef()
  // const inputDivRef = useRef()
  async function handleSubmit(e) {
    e.preventDefault()
   if (!query.trim()) return
   const queryString = `?q=${query}`
    router.replace(`${router.pathname}${queryString}`)
  }
//   async function addToList(){
//     const {Title, Year, Rated, Director, Poster, Plot, imdbID} = search
//     const movieData = {id: imdbID, title: Title, rated: Rated, year: Year, director: Director, plot: Plot, poster_link: Poster}
//     console.log("Movie Data: ", movieData)
//     const res = await fetch(`/api/movie/${movieData.title}`, {
//         method: 'POST',
//         body: JSON.stringify(movieData),
//     })
//     if (res.status === 200){
//         router.replace(router.asPath)
//     }
// }

  return (
    <div className={styles.container}>
      <Head>
        <title>MovieList Search</title>
        <meta name="description" content="MovieList Search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <Header isLoggedIn={props.isLoggedIn} username={props?.user?.username} /> */}

      <main className={styles.main}>
        {/* <h1 className={styles.title}>
         {!props.isLoggedIn && "Log in to"} Search a Movie!
        </h1> */}
        <h1>Search a Movie</h1>
        <>
        <form onSubmit={handleSubmit}>
          <input type="text" value={query} 
          onChange={e => setQuery(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
        
        {
      movie?.length
        ? <section className={styles.results}>
          {
         movie.map((movie) =>(
            <MoviePreview key={movie.Title} {...movie} />
          ))}
        </section>
        : <p className={styles.noResults}>No Movies Found!</p>
      }
      </>
        <div>
        </div>

{/* 
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
        </div> */}
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


function MoviePreview({ Title, Poster}) {
  return (
    <Link href={'/movies/' + Title} className={styles.preview}>
      <Image src={Poster} width="312" height="231" alt={Title}/>
      <span>{Title}</span>
    </Link>
  )
}