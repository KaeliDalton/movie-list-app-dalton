//list of watched movies
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
import {removeFromFavorites} from '../hooks/useFavorites'


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
export default function Search(props) {
    const [search, setSearch] = useState()
    const [movie, setMovie] = useState("")
    const logout = useLogout()
    const router = useRouter
    async function handleSubmit(e) {
      e.preventDefault()
      const response = await fetch(`http://www.omdbapi.com/?t=${movie}&apikey=f7155445 `)
      const data = await response.json()
      setSearch(data)
  }
  async function addToList(){
    const res = await fetch('/api/movies', {
        method: 'POST',
        body: JSON.stringify(search)
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
          search && <>
            <h2>{search.Title}</h2>
            <h3> {search.Year}</h3>
            <p> {search.Rated}</p>
            <p> {search.Plot}</p>
            <img src={search.Poster}/>
            <br/>
            <button onClick={addToList} className={styles.actions}>Add to Favorites</button>
            <button onClick={removeFromFavorites} className={styles.actions}>Remove from Favorites</button>
            <button className={styles.actions}>Mark Watched</button>
          </>
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
