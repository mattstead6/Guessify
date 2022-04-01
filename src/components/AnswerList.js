

function AnswerList({correctAnswers}) {
    console.log(correctAnswers)

    return (
        <div className="answer-list-container">
            <div className="title">
                <img style={{maxWidth: '30%'}} src='/images/Song list.png' alt='Played Song List'></img>
            </div>
            <div className='list-container'>
                <ul className="answer-list">
                    {correctAnswers === undefined ? null :
                        correctAnswers.map(answer => (
                            answer.song.name === undefined ? null :
                            <li key = {answer.id}><p>
                                <b className="song-details">Title: </b>{answer.song.name}, <b className="song-details">Artist: </b>{answer.song.artists[0].name}
                                    {answer.wasCorrect ? <span style={{float:left}}>✔️</span> : null}
                                <br/> <a
                                    className="spotify-link"
                                    href={"https://open.spotify.com/track/" + answer.id}
                                    target="_blank"
                                    rel="nooppener noreferrer">open in spotify
                                    </a>
                                </p>
                            </li>                
                            )
                        )}
                </ul>
            </div>
        </div>
    )
}

export default AnswerList;