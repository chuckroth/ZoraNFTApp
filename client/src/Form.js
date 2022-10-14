import React, {useState} from "react"
import axios from 'axios'

function Form (){
        const [ name, setName ] = useState("")
    
        async function postName(e) {
            e.preventDefault()
            try {
                await axios.post("/hey_honey", {
                    name
                })
            } catch (error) {
                console.error(error)
            }
        }
    
        return (
            <div className="App">
                <form onSubmit={postName}>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <button type="submit">Send Name</button>
                </form>
            </div>
        )
}

export default Form