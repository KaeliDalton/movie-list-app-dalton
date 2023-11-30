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
import {addToList} from "../hooks/addFavorite"

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    const props = {};
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

export function Search() {
  const [search, setSearch] = useState()
  const [movie, setMovie] = useState("")
  // make API call when component loads
  async function handleSubmit(e) {
    e.preventDefault()
    const response = await fetch(`http://www.omdbapi.com/?t=${movie}&apikey=f7155445 `)
    const data = await response.json()
    setSearch(data)
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={movie} onChange={e => setMovie(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {
        search && <>
          <h2>{search.Title}</h2>
          <h3> {search.Year}</h3>
          <p> {search.Rated}</p>
          <p> {search.Plot}</p>
          <img src={search.Poster}/>
        </>
      }
    </>
  )
}
export default function Home(props) {
  const router = useRouter();
  const logout = useLogout();
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header isLoggedIn={props.isLoggedIn} username={props?.user?.username} />

      <main className={styles.main}>
        <h1 className={styles.title}>
         {!props.isLoggedIn && "Log in to"} Search a Movie!
        </h1>
        <Search></Search>
        <div>
        <Link href="/dashboard" onClick={addToList}>Favorites</Link>
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
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}