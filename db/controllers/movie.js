import Movie from '../models/movie'
import User from '../models/user'
//Why won't dbConnect import???
import {dbConnect, normalizeId} from './util'

export async function getAll(userId){
    await dbConnect()
    const user = await User.findById(userId).lean()
    if (!user) return null
    return user.myMovies.map(movie => normalizeId(movie))
}

export async function addMovie(userId, movie){
    await dbConnect()
    const user = await user.findByIdAndUpdate(
        userId,
        {$addToSet: {myMovies: movie}},
        {new: true}
    )
   if (!user) return null
   const addedMovie = user.myMovies.find(mv => mv.imdbId === movie.imdbId)
return normalizeId(addedMovie)
}


export async function markWatched(userId){
    await dbConnect()
    const user = await User.findByIdAndUpdate(
        userId,
        {$set: {myMovies: {isWatched: true}}},
        {new: true}
    )
  if(!user) return null
    return normalizeId(movie)
}

export async function getUnWatched(userId){
    await dbConnect()
    const user = await User.findById(userId).lean()
    if (!user) return null
    const movie = user.myMovies.find(movie => movie.isWatched === false)
    if (movie) return normalizeId(movie)
    return null
}

export async function getWatched(userId){
    await dbConnect()
    const user = await User.findById(userId).lean()
    if (!user) return null
    const movie = user.myMovies.find(movie => movie.isWatched === true)
    if (movie) return normalizeId(movie)
    return null
}

export async function remove(userId, movieId){
  await dbConnect()
  const user = await User.findByIdAndUpdate(
    userId,
    {$pull: {myMovies: {_id: movieId}}},
    {new: true}
  )
  if (!user) return null
  return true
}