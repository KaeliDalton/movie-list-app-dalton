export default function(){
    //I want to take the movie info and then store it in my database
  return async function handleFavorites() {
    try {
      const res = await fetch('/movies/id', {method: 'POST'})
      if (res.status === 200)
        router.push('/dashboard')
    } catch(err) {
      console.log(err)
    }
  }
}