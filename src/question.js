import React from "react"
import {nanoid} from 'nanoid'
import SingleQuestion from './SingleQuestion'

export default function Question(){
  
  const[questions, setQuestions] = React.useState([])
const[questionElements, setQuestionElements]  = React.useState([])
const[Warning, setWarning] = React.useState(false)
const[score, setScore] = React.useState(0)
const[showScore, setShowScore]= React.useState(false)
const[loading, setLoading] = React.useState(true)
 //console.log = function(){}
 
    React.useEffect(()=>{
   if(questions.length === 0){
        fetch('https://opentdb.com/api.php?amount=5&category=12&type=multiple')
        .then(res=> res.json())
        .then((data)=> {
            setQuestions(data.results);
            setLoading(false)
           
    setQuestionElements(data.results.map((Element)=>{
    return{ 
        question: Element.question,
                value: shuffle([...Element.incorrect_answers, Element.correct_answer, ]),
                correctAnswer: Element.correct_answer,
                selectedAnswer: '',
                }}))});
              
    }
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
     
        questionElements.map((elementObj)=> {
return   elementObj.correctAnswer === answer? setScore((prevscore)=> prevscore+1 ): setScore((prevscore)=>prevscore)
       })
      } 

     
  function viewScore(){
   // const correctSelectedAnswer = questionElements.filter((Element)=> {
     // return Element.selectedAnswer===Element.correctAnswer
 //   })
  const allAnswer=  questionElements.map((Element)=>  Element.selectedAnswer )
  const check = allAnswer.includes("")

  setWarning(check)
  if(check===false){
  // setScore(correctSelectedAnswer.length)
          setShowScore(!false)
  }}
      
  
    
function playAgain(){
    setQuestions([])
 setQuestionElements([])
 setLoading(true)
 setShowScore(false)
    setScore(0)
    setWarning(false)
}
     
     const quizElement= questionElements.map((Element)=> {
return  <SingleQuestion
key= {nanoid()}
 question ={Element.question}
  options ={Element.value}
  correctAnswer={Element.correctAnswer}  
  updateAnswer={updateAnswer}
  selectedAnswer={Element.selectedAnswer}

 />
 })
 

    return( 
      <div className="result">        
{quizElement} 
{Warning && <p className="text"> Answer all questions </p>}
 { showScore?  <div> <button className="button" onClick={playAgain}> play again </button>
 <p className="text">you scored {score}/5 correct answers</p> </div> : 
  loading? <h3>Loading Questions...</h3> :  <button className="button"
  onClick={viewScore}>Check Answer </button> 
}
        </div>
      
)
  
     }
     
