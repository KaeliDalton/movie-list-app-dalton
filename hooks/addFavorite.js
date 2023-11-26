import { useRouter } from "next/router"
export default function useList(){
  const router = useRouter()
     async function addToList(movie){ 
      const res = await fetch('/api/movie', {
        method: 'POST', 
        body: JSON.stringify(movie)
      })
      if (res.status === 200)
        router.replace(router.asPath)
      }

    async function removeFromList(movie){
      const res = await fetch('/api/movie', {
        method: 'DELETE',
        body: JSON.stringify(movie)
      })
      if (res.status === 200) 
        router.replace(router.asPath)
      }
  return {
    addToList, removeFromList
  }
}