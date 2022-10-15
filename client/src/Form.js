import React, {useState} from "react";
import axios from 'axios'

export default function Form() {
    const [name, getNFT] = useState("");
    const [pics, setPics] = useState([]);
  
    return (
      <div className="App">
        <form onSubmit={async (e)=>{
            e.preventDefault()
            const resp = await postName(name)
            let x
            let imageArray = []
         
          
            for(x=0; x<resp.length; x++){
                const oldImageUrl = resp[x]
                const newImageUrl = (oldImageUrl.slice(3,-3))
                imageArray.push(<img src={newImageUrl} alt="Internal Server Error" loading="lazy"/>)
                
            }
            setPics(imageArray)
        }}>
          <input
            type="text"
            value={name}
            onChange={(e) => getNFT(e.target.value)}
          />
          <button type="submit">Get Collection's Gallery</button>
          <p>{pics}</p>
        </form>
      </div>
    );
}

async function postName (e) {
      try {
        const resp = await axios.post("/hey_honey",{ e })
        console.log(resp.data)
        let x
        let imageArray = []
          
            for(x=0; x<resp.data.length; x++){
                let anImageSrc = JSON.stringify(resp.data[x].url)
                imageArray.push(anImageSrc)
                
            }
        console.log("this is image array "+imageArray)
        return imageArray
      } catch (error) {
        console.error(error);
      }
}