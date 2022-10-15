import React, {useState} from "react";
import axios from 'axios'

export default function Form() {
    const [name, getNFT] = useState("");
    const [pics, setPics] = useState([]);
  
    return (
      <div className="App">
        <form onSubmit={async (e)=>{
            e.preventDefault()
            let imageArray = []
            const resp = await postName(name)
            if (resp === "Internal Server Error"){
                imageArray = "Internal Server Error"
            } else {
            let x
            for(x=0; x<resp.length; x++){
                const oldImageUrl = resp[x]
                imageArray.push(<img src={oldImageUrl} alt="Internal Server Error" loading="lazy"/>)
                
            }
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
                let newImageSrc = anImageSrc.slice(3, -3)
                imageArray.push(newImageSrc)
                
            }
        console.log("this is image array "+imageArray)
        return imageArray
      } catch (error) {
        console.error(error);
        return "Internal Server Error"
      }
}