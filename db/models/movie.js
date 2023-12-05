import { Schema } from 'mongoose'

const movieSchema = new Schema({
  title: String,
  year: Number,
  rated: String,
  runtime: String,
  director: String,
  plot: String,
  poster_link: String,
  isWatched: Boolean,
  // isWatched: {type: Boolean, default: false},
})


export default movieSchema