import React from 'react'
function UserMeme(props) {
    return(
        <div className="createdMeme">
            <img src={props.userMemes.randomImg} alt=""/>
            <h2 className="top">{props.userMemes.topText}</h2>
            <h2 className="bottom">{props.userMemes.bottomText}</h2>
        </div>
    )
}

export default UserMeme