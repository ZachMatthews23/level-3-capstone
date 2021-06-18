import React from 'react'
import axios from 'axios'
import UserMeme from './UserMeme'
import MemeForm from './MemeForm'
import Delete from './Delete-Btn'


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
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){
        axios.get("https://api.imgflip.com/get_memes")
            .then(res => {
                const {memes} = res.data.data
                this.setState({
                    memeArray: memes,     
                })
                const randNum = Math.floor(Math.random() * 100)
                console.log(randNum)
                const memeId =this.state.memeArray[randNum].id
                
                const loadMeme = this.state.memeArray[randNum].url
                this.setState({
                    randomImg: loadMeme,
                    id: Math.random() * 100
                })
            })
            .catch(err => console.log(err))
    }

    clickHandler() {
        const randNum = Math.floor(Math.random() * 100)
        console.log(randNum)
        const loadMeme = this.state.memeArray[randNum]

        this.setState({randomImg: loadMeme.url, id: Math.random() * 100})
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
            id: Math.random() * 100
        }
        this.setState(prevState => ({
            topText: "",
            bottomText: "",
            userMemes: [newObject, ...prevState.userMemes]
        }))
    }
    
    handleDelete(item) {
        this.setState({userMemes: this.state.userMemes.filter(el => el.id !==item.id ) })
    }

    editText(){

    }

    changeColor(){
        //change styles of top and bottom text color: black or white
    }
    render() {
            const createdMemes = this.state.userMemes.map(meme => <UserMeme userMemes={meme} key={meme.id} handleDelete= {this.handleDelete}  />)
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