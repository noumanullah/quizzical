
export default function Main(props){
    return (
        <header className="App-header">
            <h1 className="headerText">Quizzical</h1>
            <p className='firstContent'>This is a small quiz application using <a href="_blank">Open Trivia Database</a></p>
            <button 
                className="btnStartQuiz" 
                onClick={props.handleClick}>Start quiz</button>
        </header>
    )
}