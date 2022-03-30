

function AnswerList({correctAnswers}) {
    console.log(correctAnswers)

    return (
        <div>
            <h4>Song List: </h4>
            <ul className="answer-list">
            {correctAnswers === undefined ? null :
                correctAnswers.map(answer => (
                    answer === undefined ? null :
                    <li key = {answer.id}><p>
                        <b>Name: </b>{answer.name}, <b>artist: </b>{answer.artists[0].name}, <a
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
    )
}

export default AnswerList;