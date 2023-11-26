import { Schema, model, models } from 'mongoose'

const MovieSchema = new Schema({
  movie: {
    title: String,
    year: Number,
    rated: String,
    runtime: String,
    director: String,
    plot: String,
    poster_link: String,
    isFavorite: Boolean,
    isWatched: Boolean,
  },
})


export default models.Movie || model('Movie', MovieSchema)