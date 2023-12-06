import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../../config/session"
import db from '../../../db'

export default withIronSessionApiRoute(
  function handler(req, res) {
    if(!req.session.user){
        return res.status(401).json({error: "Not Authorized"})
    }
    switch(req.method){
        case 'POST':
            return addMovie(req,res)
        case 'DELETE':
            return removeMovie(req,res)
        case 'PUT':
        return updateList(req, res)
        default:
            return res.status(404).end()
    }
},
sessionOptions
)

const addMovie = async(req, res)=>{
        const movie = req.body
        console.log(movie)
        try {
            const addedMovie = await db.movie.add(req.session.user.id, movie)
            if(addedMovie) {
                res.status(200).end()
            }else {
                req.session.destroy()
                res.status(401).end()
            }
        } catch(err){
            res.status(400).json({error: err.message})
        }
    }
    
    const removeMovie = async(req, res) =>{
        const movie = await JSON.parse(req.body)
        try {
            const removedMovie = await db.movie.remove(req.session.user.id, movie.title)
            if(removedMovie) {
                res.status(200).json(movie)
            }else {
                req.session.destroy()
                res.status(401).end()
            }
        } catch(err){
            res.status(400).json({error: err.message})
        }
    }
   
    const updateList = async(req, res) =>{
        const movie = await JSON.parse(req.body)
        try {
            const updatedList = await db.movie.markWatched(req.session.user.id, movie.title)
            if(updatedList === null) {
                req.session.destroy()
                return res.status(401).end()
            }
            return res.status(200).json(movie)
        } catch(err){
            res.status(400).json({error: err.message})
        }
    }
