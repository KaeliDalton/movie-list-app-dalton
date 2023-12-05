import * as actions from './actions'

export default function reducer(state, {action, payload}){
    switch(action){
        case actions.SEARCH_FILMS:
            return {...state, movieSearchResults: payload}
        case actions.ADD_MOVIE:
            return {...state, favoriteMovies: [...state.favoriteMovies, payload]}
        case actions.REMOVE_MOVIE:
            return {...state, favoriteMovies: state.favoriteMovies.filter(movie=>movie.title !== payload.title)}
        default:
            return state
    }
}