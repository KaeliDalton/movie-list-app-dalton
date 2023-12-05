import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import Header from "../components/header";
import useLogout from "../hooks/useLogout";
import MovieList from '../components/movieList'
import db from '../db'

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    let movies
    if (user)
      movies = await db.movie.getAll(user.id)
    if (!movies){
      req.session.destroy()
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }
    return { 
      props: {
        user: req.session.user,
        isLoggedIn: true,
        favoriteMovies: movies
      } };
  },
  sessionOptions
);

export default function Dashboard(props) {
  const router = useRouter()
  const logout = useLogout()
  return (
    <div className={styles.container}>
      <Head>
        <title>MovieList My Movies</title>
        <meta name="description" content="Your movies on MovieList" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header isLoggedIn={props.isLoggedIn} username={props.user.username} />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Your Lists!
        </h1>
        {props.myMovies.length > 0 ? <MovieList movies={props.myMovies}/> : <NoMovieText />}

        <p>You can update the status of each movie on that movie's page!</p>

        <div>
        <Link href='/watched'>See Your Watched List</Link>
        <a>Link to unwatched</a>
        </div>
        <p>Have buttons to update watched/unwatched displayed along with movie info, radio buttons?</p>
        <p>Have "add to favorites button", maybe a checkbox that updates it?</p>

        <div className={styles.grid}>
          <Link href="/" className={styles.card}>
            <h2>Home &rarr;</h2>
            <p>Search for movies.</p>
          </Link>
          <div
            onClick={logout}
            style={{ cursor: "pointer" }}
            className={styles.card}
          >
            <h2>Logout &rarr;</h2>
            <p>Click here to log out!</p>
          </div>
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

function NoMovieText(){
  return(
    <div>
      <p>You don't have any movies saved to My Movies.</p>
      <p>Why don't you <Link href="/index">go home</Link> and add some?</p>
    </div>
  )
}