import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";
import {withIronSessionSsr} from 'iron-session/next';
import sessionOptions from '../../config/session';
import Header from '../../components/header'
import db from '../../db'
import { getMovie } from "../../util/movie";

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps(req, {params: Title}) {
        const {user} = req.session
        const props = {}
        if (user){
            props.user = req.session.user
            try{
                const movieInfo = await getMovie(Title)
                return{
                    props: {movieInfo}
                }
            } catch (error){
                return {
                    props: {
                        movieInfo: null
                    }
                }
            }
        }
        props.isLoggedIn = !!user
        return {props}
    },
    sessionOptions
)

export default function Movie({movieInfo}){
    return (
        <>
        <Head>
            <title>{movieInfo ? movieInfo.Title : 'Movie Not Found'}</title>
            <meta name="description" content={movieInfo ? 'Movie info for ' + movieInfo : 'Movie Not Found Page'} />
        </Head>
        <Header isLoggedIn={isLoggedIn} />
        {
          movieInfo ? (
            <MovieInfo {...movieInfo} />
          ) : (
            <MovieError/>
          )}
          <Link href="/">Return Home</Link>
          </>
    )
 }

function MovieInfo({
    Title,
    Year,
    Rated,
    Runtime,
    Director,
    Plot,
   Poster
}){
    return (
        <>
        <div>
            <div>
                <h1>{Title}</h1>
                <img src={Poster} alt={Title} />
                <h2>{Year}</h2>
                <h3>{Director}</h3>
                <h4>Rated: {Rated} Runtime: {Runtime}</h4>
                <p>{Plot}</p>
            </div>
        </div>
        </>
    )
}

function MovieError(){
    return(
        <h1>Movie Not Found</h1>
    )
}