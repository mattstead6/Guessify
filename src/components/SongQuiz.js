
function SongQuiz ({songList}) {
    console.log(songList)
    return (
        <div>
        <h1>yusss</h1>
        <ul>
            {songList.map((song => (
                <>
                <li>name: {song.name}, artist: {song.artists[0].name}</li>
                <li><a href={song.preview_url}>Preview</a></li>
                </>
                )
            ))}
        </ul>
        </div>
    )
}

export default SongQuiz;