export async function getMovie(query){
    const response = await fetch(`http://www.omdbapi.com/?t=${query}&apikey=${process.env.API_KEY}`)
    if (response.status !== 200)
        return null
    const data = await response.json()
    return data
}