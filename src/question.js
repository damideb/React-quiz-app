import React from "react"
import {nanoid} from 'nanoid'
import SingleQuestion from './SingleQuestion'

export default function Question(){
  
  const[questions, setQuestions] = React.useState([])
const[questionElements, setQuestionElements]  = React.useState([])
const[Warning, setWarning] = React.useState(false)
const[score, setScore] = React.useState(0)
const[showScore, setShowScore]= React.useState(false)
const[loading, setLoading] = React.useState(false)
const[error,setEror] =React.useState()
const[alreadyPlayed,setAlreadyplayed] = React.useState(false)
 console.log = function(){}
 
    React.useEffect(()=>{
      async function loadData(){
        if(questions.length === 0){
          setLoading(true)
          try{
            const response = await  fetch('https://opentdb.com/api.php?amount=5&category=12&type=multiple')
            const data =   await response.json()
                 setQuestions(data.results)
         setQuestionElements(data.results.map((Element)=>{
         return{ 
             question: Element.question,
                     value: shuffle([...Element.incorrect_answers, Element.correct_answer, ]),
                     correctAnswer: Element.correct_answer,
                     selectedAnswer: '',
                     }}))
                    }       
          catch (err){
            setEror("There was an error fetching questions")
         
        }finally{
          setLoading(false)
        }}}
          loadData() 
      }, [questions]);
     
   function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}
    
    function updateAnswer(currentQuestion, answer){
    setQuestionElements(
        questionElements.map((elementObj)=> {
return   elementObj.question === currentQuestion? {...elementObj, selectedAnswer: answer} : elementObj
       }))
      } 

     
  function viewScore(){
   const correctSelectedAnswer = questionElements.filter((Element)=> {
      return Element.selectedAnswer===Element.correctAnswer
   })
  const allAnswer=  questionElements.map((Element)=>  Element.selectedAnswer )
  const check = allAnswer.includes("")

  setWarning(check)
  if(check===false){
   setScore(correctSelectedAnswer.length)
          setShowScore(!false)
          setAlreadyplayed(true)
  }}
      
  
function playAgain(){
    setQuestions([])
 setQuestionElements([])
 setLoading(true)
 setShowScore(false)
    setScore(0)
    setWarning(false)
    setAlreadyplayed(false)
}
     
     const quizElement= questionElements.map((Element)=> {
return  <SingleQuestion
key= {nanoid()}
 question ={Element.question}
  options ={Element.value}
alreadyPlayed={alreadyPlayed}  
  updateAnswer={updateAnswer}
  selectedAnswer={Element.selectedAnswer}

 />
 })

 if(loading){
  return <h3 className="result">Loading Questions...</h3>
 }

 if(error){
  return <h3 className="result">{error}.</h3>
 }
 

  return( 
      <div className="result">        
{quizElement} 
{Warning && <p className="text"> Answer all questions </p>}
 { showScore?  <div> <button className="button" onClick={playAgain}> play again </button>
 <p className="score">You scored {score} out of 5 correct answers</p> </div> : 
  <button className="button"
  onClick={viewScore}>Check Answer </button> 
}
        </div>
      
)
     }
     
