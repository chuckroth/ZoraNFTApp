import React, {Component, useState} from "react"
import axios from 'axios'
/*
class Form extends Component{
    constructor(){
        super()
        this.state = {
            reactBody : ""
        }
    }
        // const [ name, setName ] = useState("")
      
        postName = async (e)=> {
            e.preventDefault()
            try {
                const resp = await axios.post("/hey_honey", {
                    name
                })

                console.log(resp.data)
                return resp.data
            } catch (error) {
                console.error(error)
            }
        }
        render(){
        return (
            <div className="App">
                <form onSubmit={postName}>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <button type="submit">Get Collection's Gallery</button>
                </form>
            </div>
        )}
}

export default Form*/