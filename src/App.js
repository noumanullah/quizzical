import React from 'react';
import './App.css';
import Main from "./components/Main"
// import Data from "./data"
import Quiz from "./components/Quiz"
import {nanoid} from "nanoid"

function App() {
  const [isQuizStarted, setIsQuizStarted] = React.useState(false)
  const [quizData, setQuizData] = React.useState([])
  const [Data, setData] = React.useState({})

  function bthQuizStart(){
    setIsQuizStarted(true)  
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  // function createData(){
  //   fetch("https://opentdb.com/api.php?amount=5&difficulty=easy")
  //   .then(res=> res.json())
  //   .then(data => {
  //     setData(Data)
  //     const cleanData = data.results.map(quiz =>{
  //       const arrOptions = []
  //       arrOptions.push(quiz.correct_answer, ...quiz.incorrect_answers)
  //       const arrOptionsMod = arrOptions.map(opt=>{
  //         return {
  //           id: nanoid(),
  //           value: opt,
  //           isSelected: false
  //         }
  //       })
  
  //       return (
  //         {
  //           id: nanoid(),
  //           question: quiz.question,
  //           correct_answer: quiz.correct_answer,
  //           options: shuffle(arrOptionsMod)
  //         }
  //       )
  //     })

  //     setQuizData(cleanData)
  //   })

    

    
  // }

  function handleOptionSelection(questionId, optionId, submitAnswer){
    if(submitAnswer)
      return
    const updatedData = quizData.map(question => {
      if(question.id === questionId){

        const opts = question.options.map(op=>{
          return {...op, isSelected: op.id === optionId ? true : false} 
        })

        return {...question, options: opts}
      }
      else{
        return question
      }
    })

    setQuizData(updatedData)
  }

  function playAgain(){
    setIsQuizStarted(false)
    setData([])
  }

  React.useEffect(()=>{
    
    async function getAPIData(){
      const res = await fetch("https://opentdb.com/api.php?amount=5&difficulty=easy")
      const data = await res.json()

      const cleanData = data.results.map(quiz =>{
        const arrOptions = []
        arrOptions.push(quiz.correct_answer, ...quiz.incorrect_answers)
        const arrOptionsMod = arrOptions.map(opt=>{
          return {
            id: nanoid(),
            value: opt,
            isSelected: false
          }
        })
  
        return (
          {
            id: nanoid(),
            question: quiz.question,
            correct_answer: quiz.correct_answer,
            options: shuffle(arrOptionsMod)
          }
        )
      })

      setQuizData(cleanData)
    }

    getAPIData()

  }, [Data])
  return (
    <div className="App topImage">
      { isQuizStarted === false ? 
        <Main handleClick={bthQuizStart} /> :
        <Quiz Data={quizData} handleAnswerClick={handleOptionSelection} handlePlayAgain={playAgain} />
      }
    </div>
  );
}

export default App;
