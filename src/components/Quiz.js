import {nanoid} from "nanoid"

export default function Quiz(props){
    
    const quizData = props.Data.map(quiz=>    {  
        return (
        <div key={nanoid()} className="quiz">
            <div className="question">{quiz.question}</div>
            {quiz.options.map(opt => <button key={nanoid()}>{opt}</button>)}
            <hr />
        </div>)
    })

    return (
        <div>
            {quizData}
        </div>
    )
}