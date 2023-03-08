import React from "react"
import {decode} from 'html-entities'

export default function SingleQuestion(props){

    
 function handleClick(answer, currentQuestion){
      props.updateAnswer(currentQuestion, answer)
   }
   
    return(
        
       
   <div  >
      
      <p className='question'>{decode(props.question)}</p>   
      
      <div className='option-container'>
      {
        props.options.map((answer,index)=>{
             return  <button
              className={`option ${answer===props.selectedAnswer? "Selected" : " " }`}
             onClick= {()=>handleClick(answer, props.question)}
             key={index}>{decode(answer)}</button>
             }
             
             )
      }
       
      </div>    
         </div>
         
    )
     }
     