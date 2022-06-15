import React from 'react';
import './App.css';
import Main from "./components/Main"
import Data from "./data"
import Quiz from "./components/Quiz"

function App() {
  const [isQuizStarted, setIsQuizStarted] = React.useState(false)
  const [quizData] = React.useState(createData())

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
      
      return (
            {
              question: quiz.question,
              options: shuffle(arrOptions)
            }
      )
    })

    return cleanData
  }

  console.log(quizData)

  // React.useEffect(()=>{
  //   setQuizData(Data.results)
  // },[quizData])

  return (
    <div className="App topImage">
      { isQuizStarted === false ? 
        <Main handleClick={bthQuizStart} /> :
        <Quiz Data={quizData} />
      }
    </div>
  );
}

export default App;
