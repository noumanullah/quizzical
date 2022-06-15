
export default function Main(props){
    return (
        <header className="App-header">
            <h1 className="headerText">My Quizzical App</h1>
            <p className='firstContent'>Some discription if needed</p>
            <button 
                className="btnStartQuiz" 
                onClick={props.handleClick}>Start quiz</button>
        </header>
    )
}