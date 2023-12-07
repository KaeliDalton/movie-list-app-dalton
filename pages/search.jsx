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
import { getMovie } from "../util/movie";


export async function getServerSideProps({query}) {
  const props = {}
  if (query.q){
    props.movie = await getMovie(query.q)
  }
  return { props }
}


export default function Search({movie}) {
  const [query, setQuery] = useState("")
  const logout = useLogout()
  const router = useRouter()
  async function handleSubmit(e) {
    e.preventDefault()
   if (!query.trim()) return
   const queryString = `?q=${query}`
    router.replace(`${router.pathname}${queryString}`)
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>MovieList Search</title>
        <meta name="description" content="MovieList Search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Search a Movie!
        </h1>
        <>
        <form styles={styles.form} onSubmit={handleSubmit}>
          <input styles={styles.input} type="text" value={query} 
          onChange={e => setQuery(e.target.value)} />
          <button className={styles.button} type="submit">Submit</button>
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


      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
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