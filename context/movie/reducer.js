import * as actions from './actions'

export default function reducer(state, {action, payload}){
    switch(action){
        case actions.SEARCH_FILMS:
            return {...state, movieSearchResults: payload}
        case actions.ADD_MOVIE:
            return {...state, myMovies: [...state.myMovies, payload]}
        case actions.REMOVE_MOVIE:
            return {...state, myMovies: state.myMovies.filter(movie=>movie.id !== payload.id)}
        default:
            return state
    }
}