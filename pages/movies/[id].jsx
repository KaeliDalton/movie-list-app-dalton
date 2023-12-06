import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";
import {withIronSessionSsr} from 'iron-session/next';
import sessionOptions from '../../config/session';
import {useMovieContext} from '../../context/movie'
import Header from '../../components/header'
import db from '../../db'
import * as actions from "../../context/movie/actions"

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({req, params}){
        const {user} = req.session
        const props = {}
        if (user){
            props.user = req.session.user
            const movie = await db.movie.getbyId(req.session.user.id, params.id)
            if (movie)
            props.movie = movie
        }
        props.isLoggedIn = !!user
        return {props}
    },
    sessionOptions
)

export default function Movie(props){
    const router = useRouter()
    const movieId = router.query.id
    const {isLoggedIn} = props
    const [{movieSearchResults}, dispatch] = useMovieContext()

    let isFavoriteMovie = false
    let movie
    if (props.movie){
        movie = props.movie
        isFavoriteMovie = true
    } else
    movie = movieSearchResults.find(movie => movie.id === movieId)

    useEffect(() => {
        if (!props.movie && !movie)
        router.push('/dashboard')
    }, [props.movie, movieSearchResults, movie, router])

    async function addToList(){
        const res = await fetch('/api/movie', {
            method: 'POST',
            body: JSON.stringify(movie)
        })
        if (res.status === 200){
            router.replace(router.asPath)
        }
    }

    async function removeFromList() {
        const res = await fetch('/api/movie', {
            method: 'DELETE',
            body: JSON.stringify({id: movie.id})
        })
        if (res.status === 200){
            router.replace(router.asPath)
        }
    }

    async function markAsWatched(){
        const res = await fetch('/api/movie',{
            method: "PUT",
            body: JSON.stringify({isWatched: true})
        })
    }
    return (
        <>
        <Head>
            <title>MovieList Movie</title>
            <meta name="description" content="Viewing a movie on MovieList" />
        </Head>
        <Header isLoggedIn={isLoggedIn} />
        {
            movie && 
            <main>
                <MovieInfo {...movie} />
                <div>
                    {
                        !isLoggedIn
                        ?<>
                            <p>Want to add this movie to your list?</p>
                            <Link href="/login">Login</Link>
                        </>
                        : isFavoriteMovie
                        ? <button onClick={removeFromList}>
                            Remove from My Movies
                            </button>
                        : <button onClick={addToList}>
                            Add to My Movies
                        </button>
                    }
                    {
                        !isLoggedIn
                        ?<>
                        <p>Want to mark this movie as watched?</p>
                        <Link href="/login">Login</Link>
                        </>
                        :isWatched
                        ?<p>Already marked as watched</p>
                        :<button onClick={markAsWatched}>
                            Mark as Watched
                        </button>
                    }
                    <a href="#" onClick={() => router.back()}>
                        Return
                    </a>
                </div>
            </main>
        }
        </>
    )
}

function MovieInfo({
    title,
    year,
    rated,
    runtime,
    director,
    plot,
    isWatched,
    isFavorite,
    poster_link
}){
    return (
        <>
        <div>
            <div>
                <h1>{title}{isFavorite}{isWatched}</h1>
                <img src={poster_link} alt={title} />
                <h2>{year}</h2>
                <h3>{director}</h3>
                <h4>Rated: {rated} Runtime: {runtime}</h4>
                <p>{plot}</p>
            </div>
        </div>
        </>
    )
}