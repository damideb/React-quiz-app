import React from "react"
import "./style.css"
import Start from './start.js'
import Question from './question.js'

function App(){
    const[showQuiz, setShowQuiz] = React.useState(false)
        function setQuiz(){  setShowQuiz(!false) }
        return (
            <main>
    { 
        showQuiz ===false? 
    <Start quiz={setQuiz}  /> :  <Question />
    }
     </main>     
        )}
        export default App