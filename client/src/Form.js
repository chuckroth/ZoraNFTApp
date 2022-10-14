import React, {useState} from "react"
import axios from 'axios'

function Form (){
        const [ name, setName ] = useState("")
    
        async function postName(e) {
            e.preventDefault()
            try {
                const resp = await axios.post("/hey_honey", {
                    name
                })
                console.log(resp.data)
            } catch (error) {
                console.error(error)
            }
        }
        return (
            <div className="App">
                <form onSubmit={postName}>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <button type="submit">Get Collection's Gallery</button>
                </form>
            </div>
        )
}

export default Form