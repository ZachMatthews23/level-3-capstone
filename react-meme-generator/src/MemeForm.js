import React from 'react'

function MemeForm(props) {
    return(
        <div>
            <form name="meme-inputs" className="meme-form" onSubmit={props.handleSubmit}>
                <input
                    type="text"
                    name="topText"
                    placeholder="Top Text"
                    value={props.topText}
                    onChange={props.handleChange}    
                />
                <input
                    type="text"
                    name="bottomText"
                    placeholder="Bottom Text"
                    value={props.bottomText}
                    onChange={props.handleChange} 
                />
                <button>Generate Meme</button>
            </form>
            <button onClick={props.clickHandler}>Refresh Image</button>
            <div className="meme">
                    <img src={props.randomImg} alt=""/>
                    <h2 className="top">{props.topText}</h2>
                    <h2 className="bottom">{props.bottomText}</h2>
            </div>
        </div>
    )
}

export default MemeForm