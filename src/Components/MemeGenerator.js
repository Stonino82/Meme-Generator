import React, { Component} from 'react'

class MemeGenerator extends Component {
    constructor(){
        super()
        this.state = {
            topText: '',
            bottomText: '',
            allMemes: [],
            randomImg: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount(){

        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(data => {
                const {memes} = data.data
                this.setState({
                    allMemes: memes
                })
                //random image on load page
                const randomNum = Math.floor(Math.random() * this.state.allMemes.length)
                const newRandomImg = this.state.allMemes[randomNum].url
                this.setState({
                    randomImg: newRandomImg
                })
            })
        
        
    }

    handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name] : value
        })
    }

    handleClick(event){
        event.preventDefault()

        const randomNum = Math.floor(Math.random() * this.state.allMemes.length)
        const newRandomImg = this.state.allMemes[randomNum].url
        this.setState({
            randomImg: newRandomImg
        })
    }

    render(){
        return(
            <div>
                <form className="meme-form">
                    
                    <input  type="text" 
                            name="topText" 
                            value={this.state.topText} 
                            placeholder="top text"
                            onChange={this.handleChange}
                    >
                    </input>

                    <input  type="text" 
                            name="bottomText" 
                            value={this.state.bottomText} 
                            placeholder="bottom text"
                            onChange={this.handleChange}
                    >
                    </input>
                    
                    <button onClick={this.handleClick}>Change Image</button>
                </form>

                <div className="meme">
                    <img src={this.state.randomImg} alt="meme" />
                    <h3 className="top">{this.state.topText}</h3>
                    <h3 className="bottom">{this.state.bottomText}</h3>
                </div>
            </div>
        )
    }
}

export default MemeGenerator