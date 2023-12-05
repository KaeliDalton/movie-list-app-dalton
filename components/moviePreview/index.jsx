export default function MoviePreview({
    title,
    year,
    poster_link
}){
    return(
        <div>
            <img 
                src={poster_link}
                alt={title} />
            <div>
                <p>{title}</p>
                <p>{year}</p>
            </div>
        </div>
    )
}