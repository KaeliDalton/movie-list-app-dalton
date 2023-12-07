// import User from './models/user'
// import Note from '../models/note'
// import { normalizeId, dbConnect } from './util'

// export async function getAll(userId){
//     await dbConnect()
//     const user = await User.findbyId(userId).lean()
//     if (!user) return null
//     return user
// }

// export async function getByNoteId(noteId){
//     await dbConnect()
//     const note = Note.findById(noteId).lean()
//     if (note) return note
//     return null
// }

// export async function create(favorites, top_genre, notes, note_date){
//     await dbConnect()
//     const note = await Note.create({favorites, top_genre, notes, note_date})
//     if (!note){
//         throw new Error('Error making note')
//     }
//     return normalizeId(note)
// }

// export async function add(userId, noteId, today){
//     await dbConnect()
//     const user = await User.findByIdAndUpdate(
//         userId,
//         {$addToSet: {savedNotes: {id: noteId, note_date: today}}},
//         {new: true}
//     )
//         if (!user){
//             return null
//         }
//     return {}
// }

// export async function remove(userId, noteId){
//     await dbConnect()
//     const note = noteId.id
//     try{
//         let user = await User.findById(userId)
//         if (!user) throw new Error('User does not exist')
//         user.savedNotes = user.savedNotes.filter(savedNote => savedNote.id !== note)
//     user.save()
//     return user
//     } catch(error){
//         return null
//     }
// }