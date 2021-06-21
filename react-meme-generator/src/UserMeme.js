import React from 'react'

function UserMeme(props) {
    console.log("Meme Id " + props.userMemes.id)
    
    return(
        props.userMemes.isEditing === false?
        <div className="createdMeme">
            <button className="editBtn" onClick={() => props.takeToEdit(props.userMemes.id)}>Edit Text</button>
            <button className="deleteBtn" onClick={() => props.handleDelete(props.userMemes)}>Delete</button>
            <img className="image" src={props.userMemes.randomImg} alt=""/>
            <h2 className="topCreated">{props.userMemes.topText}</h2>
            <h2 className="bottomCreated">{props.userMemes.bottomText}</h2>
          
        </div>
        :
    
        <form name="meme-inputs" className="meme-form" onSubmit={(e) => props.submitEdits(e, props.userMemes.id)}>
            <input
                className="input"
                type="text"
                name="topCreatedText"
                placeholder="Top Text"
                value={props.topCreatedText}
                onChange={props.handleChange}    
            />
            <input
                className="input"
                type="text"
                name="bottomCreatedText"
                placeholder="Bottom Text"
                value={props.bottomCreatedText}
                onChange={props.handleChange} 
            />
            <button className="button">Submit Edits</button>
        </form>        
    
        
        
    )
   
}

export default UserMeme