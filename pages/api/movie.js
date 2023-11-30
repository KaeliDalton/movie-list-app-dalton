//BROKE THINGS SOMEHOW TRYING TO WRITE THIS PART. COMMENTED OUT UNTIL I CAN FIGURE OUT HOW TO FIX


// //use for CRUD operations
// //add/remove movie
// //update to filter??
// import { withIronSessionApiRoute } from "iron-session/next/dist";
// //Won't import properly???????????????????
// import sessionOptions from "../../config/session"
// import { ADD_MOVIE, REMOVE_MOVIE } from "../../context/actions";
// import db from '../../db'

// // export default withIronSessionApiRoute(
//     export default withIronSessionApiRoute(
//     async function handleActions(req, res){
//         if(!req.session.user){
//             return res.status(401).end()
//         }
//         switch(req.method){
//             case 'POST':
//                 return addMovie(req,res)
//             case 'DELETE':
//                 return removeMovie(req,res)
//             case 'PUSH':
//                 return updateList(req, res)
//         }
//         return res.status(404).end
//     },
//     sessionOptions
// )

// const addMovie = async(req, res)=>{
//     const movie = await JSON.parse(req.body)
//     try {
//         const addedMovie = await db.movie.add(req, res)
//         if(addedMovie) {
//             res.status(200).end()
//         }else {
//             req.session.destroy()
//             res.status(401).end()
//         }
//     } catch(err){
//         res.status(400).json({error: err.message})
//     }
// }

// const removeMovie = async(req, res) =>{
//     const movie = await JSON.parse(req.body)
//     try {
//         const removedMovie = await db.movie.remove(req.session.user.id, movie.name)
//         if(removedMovie) {
//             res.status(200).end()
//         }else {
//             req.session.destroy()
//             res.status(401).end()
//         }
//     } catch(err){
//         res.status(400).json({error: err.message})
//     }
// }

// //how to update two different aspects separately?
// // const updateList = async(req, res) =>{
// //     const movie = await JSON.parse(req.body)
// //     try {
// //         const updatedList = await db.movie.findOneandUpdate(req.session.user.id, movie.name)
// //         if(movie.isFavorite) {
// //             //set boolean to false
// //         }else {
// //             //set true
// //         }
// //     } catch(err){
// //         res.status(400).json({error: err.message})
// //     }
// // }