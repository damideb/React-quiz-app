import React from "react"
import {decode} from 'html-entities'

export default function SingleQuestion(props){

 function handleClick(currentQuestion, answer){
      props.updateAnswer(currentQuestion, answer)

   }
    return(   
   <div>
      <p className='question'>{decode(props.question)}</p>   
      <div className='option-container'>
      {
        props.options.map((answer,index)=>{
             return  <button className={`option ${answer===props.selectedAnswer? "Selected" : " " }`}
             disabled={props.alreadyPlayed}
             onClick= {()=>handleClick(props.question, answer)}
             key={index}>{decode(answer)}</button>
             }
             )
      }
      </div>    
         </div>      
    )
     }
     