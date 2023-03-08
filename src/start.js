import React from "react"

export default function Start(props){
    
    
    return(
    <div className='start'>
       <h3 className= 'heading'>Quizzical</h3>
    <p className="description"> Some description if needed </p>
    <button className="start-button" onClick={props.quiz} > Start quiz </button>
    </div>
    )
}