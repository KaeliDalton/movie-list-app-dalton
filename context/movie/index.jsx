import React, {useContext, createContext, useReducer} from "react"
import initialState from "./state"
import reducer from './reducer'

export const movieContext = createContext()

export const useMovieContext = () => {
    const context = useContext(movieContext)
    if (context === undefined)
        throw new Error('useMovieContext must be used within MovieProvider')
    return context
}

export const MovieProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (<movieContext.Provider value={[state, dispatch]} {...props} />)
}