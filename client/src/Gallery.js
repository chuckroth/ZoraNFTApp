import React, {Component, useState, setState} from "react";
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
                <Worm />
                <div>{this.state.ImageUrl}</div>
            </div>
        )
    }
}

function Worm (){
    const [ name, getNFT ] = useState("")
    let postName = (e) =>{
        let output
        async function getInfo(e) {
        e.preventDefault()
        try {
            const resp = await axios.post("/hey_honey", {
                name
            })

            console.log(resp.data)
            output = resp.data
            return output
        } catch (error) {
            console.error(error)
        }
        }
        getInfo(e).then(output =>{console.log("output it outside of function scope", output)
        this.setState({ name : output})
        })
        
    }
    return (
        <div className="App">
            <form onSubmit={postName}>
                <input type="text" value={name} onChange={(e) => getNFT(e.target.value)} />
                <button type="submit">Get Collection's Gallery</button>
                <p>{name}</p>
            </form>
        </div>
    )
}
