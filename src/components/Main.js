
export default function Main(props){
    return (
        <header className="App-header">
            <h1 className="headerText">Quizzical</h1>
            <p className='firstContent'>A Simple Quiz Game</p>
            <button 
                className="btnStartQuiz" 
                onClick={props.handleClick}>Start quiz</button>
        </header>
    )
}