//use to display the list of movies
import Link from 'next/link'
import MoviePreview from '../moviePreview'

export default function MovieList({movies}){
    return (
        <div>
            {movies && <Link key={movie.movieId} href={`/movie/${movie.movieId}`}>
                <MoviePreview {...movie} />
            </Link>}
        </div>
    )
}
