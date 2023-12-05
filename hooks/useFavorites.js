import { useRouter } from 'next/router'

export default function useFavorites() {
    const router = useRouter()
    async function addToFavorites(movie) {
        const res = await fetch("/api/movie", {
          method: "POST",
          body: JSON.stringify(movie)
      })
      if (res.status === 200) router.replace(router.asPath)
      }
      async function removeFromFavorites(movie) {
        const res = await fetch("/api/movie", {
          method: "DELETE",
          body: JSON.stringify(movie)
        })
        if (res.status === 200) router.replace(router.asPath)
      }

    return {
        addToFavorites,
        removeFromFavorites
    }
}