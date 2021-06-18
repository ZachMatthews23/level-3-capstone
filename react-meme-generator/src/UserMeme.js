import React from 'react'

function UserMeme(props) {
    console.log("Meme Id " + props.userMemes.id)
    return(
        <div className="createdMeme">
            <button className="deleteBtn" onClick={() => props.handleDelete(props.userMemes)}>Delete</button>
            <img className="image" src={props.userMemes.randomImg} alt=""/>
            <h2 className="topCreated">{props.userMemes.topText}</h2>
            <h2 className="bottomCreated">{props.userMemes.bottomText}</h2>
          
        </div>
        
    )
   
}

export default UserMeme