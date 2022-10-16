import React, {useState} from "react";
import axios from 'axios'
import Card from 'react-bootstrap/Card';

export default function Form() {
    const [name, getNFT] = useState("");
    const [pics, setPics] = useState([]);
  
    return (
      <div className="App">
        <h1>Zora NFT Query</h1>
        <form onSubmit={async (e)=>{
            e.preventDefault()
            let imageArray = []
            const resp = await postName(name)
            if (resp === "Internal Server Error"){
                imageArray = "Bad Query"
            } else {
            let x
            for(x=0; x<resp.length; x++){
                
                if(!resp[x].url){
                    continue
                } else{
                    const nftName = resp[x].name
                    const nftDescription = resp[x].description
                    const nftImage = resp[x].url
                    const nftOWner = resp[x].owner
                    //imageArray.push(<div><img src={nftImage} alt={nftDescription} loading="lazy"/><h1>{nftName}</h1><p>owner: {nftOWner}</p></div>)
                    imageArray.push(
                        <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={nftImage} alt= {nftDescription}/>
                        <Card.Body>
                        <Card.Title>{nftName}</Card.Title>
                        <Card.Text>
                        owner: {nftOWner}
                        </Card.Text>
                        </Card.Body>
                        </Card>
                    )
                }
                
                
            }
            }
            setPics(imageArray)
        }}>
          <input
            type="text"
            value={name}
            onChange={(e) => getNFT(e.target.value)}
          />
          <button type="submit">Enter Collection Address</button>
        </form>
        {pics}
      </div>
    );
}

async function postName (e) {
      try {
        const resp = await axios.post('/api/nft',{ e })
        console.log(resp.data)
        
        if (resp.data === "this is bad"){
            return "Internal Server Error"
        }
        return resp.data
      } catch (error) {
        console.error(error);
        return "Internal Server Error"
      }
}