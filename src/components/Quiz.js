import {nanoid} from "nanoid"

export default function Quiz(props){
    
    const quizData = props.Data.map(quiz=>    {  
        return (
        <div key={nanoid()} className="quiz">
            <div className="question">{quiz.question}</div>
            <div className="btnContainer">
                {quiz.options.map(opt => <button 
                                            className={opt.isSelected ? "btnQuizSelected" : "btnQuiz"} 
                                            onClick={()=>props.handleAnswerClick(quiz.id, opt.id)} 
                                            key={opt.id}>
                                                {opt.value}
                                        </button>)}
            </div>
            <hr className="separator" />
        </div>)
    })

    return (
        <div>
            {quizData}
            <div className="resultContainer">
                <div className="result">You scored 3/5 correct answers</div>
                <button className="btnSubmit">Check answers</button>
            </div>
        </div>
    )
}