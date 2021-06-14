import React from 'react'
import axios from 'axios'
import UserMeme from './UserMeme'
import MemeForm from './MemeForm'


class Meme extends React.Component {
    constructor() {
        super()
        this.state = {
            memeArray: [],
            randomImg: "",
            topText: "",
            bottomText: "",
            id: "",
            userMemes: []
        }
        this.clickHandler = this.clickHandler.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        axios.get("https://api.imgflip.com/get_memes")
            .then(res => {
                const {memes} = res.data.data
                this.setState({
                    memeArray: memes       
                })
                const randNum = Math.floor(Math.random() * 100)
                console.log(randNum)
                const loadMeme = this.state.memeArray[randNum].url
                this.setState({randomImg: loadMeme})
            })
            .catch(err => console.log(err))
    }

    clickHandler() {
        const randNum = Math.floor(Math.random() * 100)
        console.log(randNum)
        const loadMeme = this.state.memeArray[randNum].url
        this.setState({randomImg: loadMeme})
    }
    
    handleChange(event) {
        const {name, value} = event.target
        this.setState({[name]: value})
    }

    handleSubmit(event) {
        event.preventDefault()
        const newObject = {
            randomImg: this.state.randomImg,
            topText: this.state.topText,
            bottomText: this.state.bottomText,
            id: this.state.id
        }
        this.setState(prevState => ({
            topText: "",
            bottomText: "",
            userMemes: [newObject, ...prevState.userMemes]
        }))
    }

    render() {
        const createdMemes = this.state.userMemes.map(meme => <UserMeme userMemes={meme}/>)

        return(
            <div >
                <MemeForm 
                    {...this.state}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    clickHandler={this.clickHandler}
                />
                <div>
                    {createdMemes}
                </div>
            </div>
        )
    }
}

export default Meme