import React, {Component} from "react";
import axios from 'axios'

export default class Gallery extends Component{
    constructor(){
        super()
        this.state = {
            ImageUrl: ""
        }
    }

    componentDidMount = () =>{
        axios.get('/api/nft').then(response=>{
            //console.log(response.data)
            let responseArray = response.data
            //console.log(responseArray.length)
            let x
            let imageArray = []
            function makeImage(aUrl){
                this.aUrl = aUrl
                
            }
          
            for(x=0; x<responseArray.length; x++){
                let anImageSrc = JSON.stringify(response.data[x].url)
                const newImage = new makeImage(anImageSrc.slice(3,-3))
                imageArray.push(<img src={newImage.aUrl} alt="Internal Server Error" />)
                
            }
            this.setState({
                ImageUrl : imageArray
                
            })
        })
    }

    render(){
        return(
            <div>
                <h1>Literally the font</h1>
                <div>{this.state.ImageUrl}</div>
            </div>
        )
    }
}