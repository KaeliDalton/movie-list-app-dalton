import Movie from '../models/movie'
import User from '../models/user'
import {dbConnect, normalizeId} from './util/index'

export async function getAll(userId){
    await dbConnect()
    const user = await User.findById(userId).lean()
    if (!user) return null
    return user.favoriteMovies.map(movie => normalizeId(movie))
}

export async function addMovie(userId, movie){
    await dbConnect()
    const user = await User.findByIdAndUpdate(
        userId,
        {$addToSet: {favoriteMovies: movie}},
        {new: true}
    )
   if (!user) return null
   const addedMovie = user.favoriteMovies.find(me => me.title === movie.title)
return normalizeId(addedMovie)
}


export async function markWatched(userId){
    await dbConnect()
    const user = await User.findByIdAndUpdate(
        userId,
        {$set: {favoriteMovies: {isWatched: true}}},
        {new: true}
    )
  if(!user) return null
    return true
}

export async function getUnWatched(userId, isWatched){
    await dbConnect()
    const user = await User.findById(userId).lean()
    if (!user) return null
    const movie = user.favoriteMovies.find(me => me.isWatched === isWatched)
    if (movie) return normalizeId(movie)
    return null
}

export async function getWatched(userId, isWatched){
    await dbConnect()
    const user = await User.findById(userId).lean()
    if (!user) return null
    const movie = user.favoriteMovies.find(me => me.isWatched === true)
    if (movie) return normalizeId(movie)
    return null
}

export async function remove(userId, movieTitle){
  await dbConnect()
  const user = await User.findByIdAndUpdate(
    userId,
    {$pull: {favoriteMovies: {title: movieTitle}}},
    {new: true}
  )
  if (!user) return null
  return true
}