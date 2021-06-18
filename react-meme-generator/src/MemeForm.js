import React from 'react'

function MemeForm(props) {
    return(
        <div className="parent">
            <header className="header">Meme Generator</header>
            <form name="meme-inputs" className="meme-form" onSubmit={props.handleSubmit}>
                <input
                    className="input"
                    type="text"
                    name="topText"
                    placeholder="Top Text"
                    value={props.topText}
                    onChange={props.handleChange}    
                />
                <input
                    className="input"
                    type="text"
                    name="bottomText"
                    placeholder="Bottom Text"
                    value={props.bottomText}
                    onChange={props.handleChange} 
                />
                <button className="button">Generate Meme</button>
            </form>
            <button onClick={props.changeColor}>Change Text Color</button>
            <button className="refreshBtn" onClick={props.clickHandler}>Refresh Image</button>
            <div className="meme">
                    <img className="image" src={props.randomImg} alt=""/>
                    <h2 className="top">{props.topText}</h2>
                    <h2 className="bottom">{props.bottomText}</h2>
            </div>
        </div>
    )
}

export default MemeForm