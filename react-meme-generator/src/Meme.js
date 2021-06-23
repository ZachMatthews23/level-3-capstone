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
            topCreatedText: "",
            bottomCreatedText: "",
            textColor: "black",
            id: "",
            userMemes: []

        }
        this.clickHandler = this.clickHandler.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.takeToEdit = this.takeToEdit.bind(this)
        this.submitEdits = this.submitEdits.bind(this)
        this.changeColor =this.changeColor.bind(this)


      
    }

    componentDidMount(){
        axios.get("https://api.imgflip.com/get_memes")
            .then(res => {
                const {memes} = res.data.data
                this.setState({
                    memeArray: memes 

                })
                const randNum = Math.floor(Math.random() * 100)
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
            id: Math.random() * 100,
            isEditing: false
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


    takeToEdit(id){
        console.log("newId"+ id)
        console.log("state (userMems)" + this.state.userMemes)
        let selectedMeme = this.state.userMemes.find(meme => meme.id === id)
        selectedMeme.isEditing = true

        let newUserMemes = this.state.userMemes.map(meme =>{
            if(meme.id === selectedMeme.id){
                console.log("Selected Meme Top Text " + selectedMeme.topText)
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
        let selectedMeme = this.state.userMemes.find(meme => meme.id === id)
        selectedMeme.topText = this.state.topCreatedText
        selectedMeme.bottomText = this.state.bottomCreatedText
        selectedMeme.isEditing = false
        let newUserMemes = this.state.userMemes.map(meme =>{
            if(meme.id === selectedMeme.id){
                console.log("Selected Meme Top Text " + selectedMeme.topText)
                return selectedMeme
            }
            else{
                return meme
            }
        })
        this.setState({userMemes: newUserMemes})


    }
    
    changeColor(){
        //change styles of top and bottom text color: black or white
        if (this.state.textColor === "black"){
            this.setState({textColor: "white"})
        }
        else{
            this.setState({textColor: "black"})
        }
    }
    render() {
        
            const createdMemes = this.state.userMemes.map(meme => 
            <UserMeme userMemes={meme} key={meme.id} topCreatedText={this.state.topCreatedText} bottomCreatedText={this.state.bottomCreatedText}handleDelete= {this.handleDelete} takeToEdit={this.takeToEdit} submitEdits={this.submitEdits} handleChange={this.handleChange} />)
        return(
            <div >
                <MemeForm 
                    {...this.state}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    clickHandler={this.clickHandler}
                    changeColor ={this.changeColor}
                  
                />
                <div>
                    {createdMemes}
                </div>
            </div>
        )
    }
}

export default Meme