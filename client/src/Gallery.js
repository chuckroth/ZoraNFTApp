import React, {Component} from "react";
import axios from 'axios'

export default class Gallery extends Component{
    constructor(){
        super()
        this.state = {
            ImageUrl: ""
        }
    }

    handleClick = () =>{
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
                imageArray.push(<img src={newImage.aUrl} alt="Internal Server Error" loading="lazy"/>)
                
            }
            this.setState({
                ImageUrl : imageArray
                
            })
        })
    }

    render(){
        return(
            <div>
                <Form />
                <button onClick={handleClick}></button>
                <div>{this.state.ImageUrl}</div>
            </div>
        )
    }
}

class Form extends Component{
    constructor(props){
        super(props);

        this.state={
            text: '',
            value: 'hello',
        }

        this.handleChange=this.handleChange.bind(this)
        this.apply=this.apply.bind(this)
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    apply(){
        
        
        this.setState(({ value }) => ({ text: postName(value) }));
      console.log(`this is the state right now${this.state.text}`)
    }

    render(){
        return (
            <div>
                <input type="text" onChange={this.handleChange} />
                <button onClick={ this.apply}>ok</button>
                <p>{this.state.text}</p>
            </div>
        );
    }
}


function postName(e){
    let output
    async function getInfo(e) {
        try {
            const resp = await axios.post("/hey_honey",{ e })
            console.log(resp.data)
            output = resp.data
            
            return output
        } catch (error) {
            console.error(error)
        }
    }

getInfo(e).then(output =>{console.log("output is outside of function scope", output)
})
return output
}