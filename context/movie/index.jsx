import React, {useContext, createContext, useReducer} from "react"
import initialState from "./state"
import reducer from './reducer'

export const MovieContext = createContext()

export const useMovieContext = () => {
    const context = useContext(movieContext)
    if (context === undefined)
        throw new Error('useMovieContext must be used within MovieProvider')
    return context
}

export const MovieProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (<MovieContext.Provider value={[state, dispatch]}>{children}</MovieContext.Provider>)
}




