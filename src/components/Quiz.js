import React from "react"
import {nanoid} from "nanoid"

export default function Quiz(props){
    const [submitAnswer, setSubmitAnswer] = React.useState(false)
    //const [result, setResult] = React.useState("")

    const quizData = props.Data.map(quiz=>    {  
        return (
        <div key={nanoid()} className="quiz">
            <div className="question">{quiz.question}</div>
            <div className="btnContainer">
                {
                quiz.options.map(opt => 
                                        <button
                                            className={
                                                submitAnswer === false ?
                                                opt.isSelected ? "btnQuizSelected" : "btnQuiz" 
                                                :
                                                //If button subbmitted true
                                                opt.isSelected ? "btnQuizSelectedAfterSubmit" : 
                                                //If answer not sellcted & true
                                                opt.value === quiz.correct_answer ? "btnQuizActualCorrectAnswer" :"btnQuizFreez"
                                                
                                            } 
                                            onClick={()=>props.handleAnswerClick(quiz.id, opt.id, submitAnswer)} 
                                            key={opt.id}
                                        >
                                            {opt.value}
                                        </button>
                                )
                }
            </div>
            <hr className="separator" />
        </div>)
    })

    function handleSubmitAnswer(){
        setSubmitAnswer(true)
        if(submitAnswer){
            props.handlePlayAgain()
        }
    }

    let correctAnswers = 0
    if(submitAnswer){
        
        props.Data.forEach(question=> {
            const selctedAnswer = question.options.filter(x=> x.isSelected && x.value === question.correct_answer).length
            correctAnswers += selctedAnswer
        })
    }

    return (
        <div>
            {quizData}
            <div className="resultContainer">
                {submitAnswer && <div className="result">{`You scored ${correctAnswers}/${quizData.length} correct answers`}</div>}
                <button className="btnSubmit" onClick={handleSubmitAnswer}>{submitAnswer ? "Play again" : "Check answers"}</button>
            </div>
        </div>
    )
}