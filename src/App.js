import React from 'react';
import './App.css';
import Main from "./components/Main"
import Data from "./data"
import Quiz from "./components/Quiz"
import {nanoid} from "nanoid"

function App() {
  const [isQuizStarted, setIsQuizStarted] = React.useState(false)
  const [quizData, setQuizData] = React.useState(createData())

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

  function createData(){
    const cleanData = Data.results.map(quiz =>{
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
          options: shuffle(arrOptionsMod)
        }
      )
    })

    return cleanData
  }

  //console.log(quizData)

  // React.useEffect(()=>{
  //   const arrData = createData()
  //   setQuizData(arrData)
  //   console.log("Iam here")
  // },[quizData])

  function handleOptionSelection(questionId, optionId){
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

  return (
    <div className="App topImage">
      { isQuizStarted === false ? 
        <Main handleClick={bthQuizStart} /> :
        <Quiz Data={quizData} handleAnswerClick={handleOptionSelection} />
      }
    </div>
  );
}

export default App;
