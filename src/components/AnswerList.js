

function AnswerList({correctAnswers}) {
    console.log(correctAnswers)

    return (
        <div>
            <h4>Song List: </h4>
            <div className="answer-list-container">
                <ul className="answer-list">
                {correctAnswers === undefined ? null :
                    correctAnswers.map(answer => (
                        answer === undefined ? null :
                        <li className="answer" key = {answer.id}><p>
                            <b>Name: </b>{answer.name}<br/> <b>Artist: </b>{answer.artists[0].name}<br/> <a
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