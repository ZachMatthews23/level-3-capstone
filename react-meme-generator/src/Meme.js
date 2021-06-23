import React from 'react'
import axios from 'axios'
import UserMeme from './UserMeme'
import MemeForm from './MemeForm'

const objectToQueryParam = (obj) => {
    const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`)
    return '?' + params.join('&')
}

class Meme extends React.Component {
    constructor() {
        super()
        
        this.state = {
            memeArray: [],
            randomImg: "",
            topText: "",
            bottomText: "",
            topCreatedText: "",
            bottomCreatedText: "",
            textColor: "black",
            id: "",
            key: "",
            userMemes: []

        }
        this.clickHandler = this.clickHandler.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.takeToEdit = this.takeToEdit.bind(this)
        this.submitEdits = this.submitEdits.bind(this)
    }

    componentDidMount(){
        axios.get("https://api.imgflip.com/get_memes")
            .then(res => {
                const {memes} = res.data.data
                this.setState({
                    memeArray: memes 
                })
                const randNum = Math.floor(Math.random() * 100)
                const loadMeme = this.state.memeArray[randNum]
                this.setState({
                    randomImg: loadMeme.url,
                    id: loadMeme.id,
                    key: Math.random()
                })
                console.log(loadMeme.id)
            })
            .catch(err => console.log(err))
    }

    clickHandler() {
        const randNum = Math.floor(Math.random() * 100)
        const loadMeme = this.state.memeArray[randNum]
        this.setState({randomImg: loadMeme.url, id: loadMeme.id})
        console.log(loadMeme.id)
    }
    
    handleChange(event) {
        const {name, value} = event.target
        this.setState({[name]: value})
    }

    handleSubmit(event) {
        event.preventDefault()

        const params = {
            template_id: this.state.id,
            text0: this.state.topText,
            text1: this.state.bottomText,
            username: 'ZKktc1234',
            password: 'KTCktc1234'
        }

        axios.get(`https://api.imgflip.com/caption_image${objectToQueryParam(params)}`)
            .then(res => {
                console.log(res)
                const newObject = {
                    randomImg: res.data.data.url,
                    topText: this.state.topText,
                    bottomText: this.state.bottomText,
                    id: this.state.id,
                    key: Math.random(),
                    isEditing: false
                }

                this.setState(prevState => ({
                    topText: "",
                    bottomText: "",
                    userMemes: [newObject, ...prevState.userMemes]
                })   
            )})
            .catch(err => console.log(err))
    }
    
    handleDelete(item) {
        this.setState({userMemes: this.state.userMemes.filter(el => el.key !== item.key ) })
    }


    takeToEdit(id){
        console.log("This is the edit ID " + id)
        let selectedMeme = this.state.userMemes.find(meme => meme.id === id)
        selectedMeme.isEditing = true

        let newUserMemes = this.state.userMemes.map(meme =>{
            if(meme.id === selectedMeme.id){
                return selectedMeme
            }
            else{
                return meme
            }
        })

        this.setState(
            {userMemes: newUserMemes}
        )
    }

    submitEdits(e, id) {
        e.preventDefault()
        console.log("this is the slected meme ID " + id)
        let selectedMeme = this.state.userMemes.find(meme => meme.id === id)
        selectedMeme.topText = this.state.topCreatedText
        selectedMeme.bottomText = this.state.bottomCreatedText
        selectedMeme.isEditing = false

        const editParams = {
            template_id: selectedMeme.id,
            text0: this.state.topCreatedText,
            text1: this.state.bottomCreatedText,
            username: 'ZKktc1234',
            password: 'KTCktc1234'
        }

        axios.get(`https://api.imgflip.com/caption_image${objectToQueryParam(editParams)}`)
            .then(res => {
                console.log(res)
                const editObject = {
                    randomImg: res.data.data.url,
                    topText: this.state.topCreatedText,
                    bottomText: this.state.bottomCreatedText,
                    id: this.state.id,
                    key: Math.random(),
                    isEditing: false
                }

                this.setState(prevState => ({
                    topText: "",
                    bottomText: "",
                    userMemes: [editObject, ...prevState.userMemes]
                })    
            )})
            .catch(err => console.log(err))
    }
    
    render() {
            const createdMemes = this.state.userMemes.map(meme => 
                <UserMeme 
                    userMemes={meme} 
                    key={meme.key} 
                    topCreatedText={this.state.topCreatedText} 
                    bottomCreatedText={this.state.bottomCreatedText}
                    handleDelete= {this.handleDelete} 
                    takeToEdit={this.takeToEdit} 
                    submitEdits={this.submitEdits} 
                    handleChange={this.handleChange} 
                />)
        return(
            <div className="form">
                <MemeForm 
                    {...this.state}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    clickHandler={this.clickHandler}
                />
                <br />
                    {createdMemes}
            </div>
        )
    }
}

export default Meme