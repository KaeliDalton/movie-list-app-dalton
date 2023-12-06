//use to display the list of movies
import Link from 'next/link'
import MoviePreview from '../moviePreview'

export default function MovieList({movies}){
    return (
        <div>
            {movies.map(movie => <Link key={movie.title} href={`/movie/${movie.title}`}>
                <MoviePreview {...movie} />
            </Link>)}
        </div>
    )
}
