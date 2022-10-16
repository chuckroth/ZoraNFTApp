import React, {useState} from "react";
import axios from 'axios'
import Card from 'react-bootstrap/Card';

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
              imageArray = "Bad Query"
          } else {
          let x
          for(x=0; x<resp.length; x++){
              
              if(!resp[x].url){
                  continue
              } else{
                  const nftName = resp[x].name
                  const nftImage = resp[x].url
                  imageArray.push
                  (<Card style={{ width: '30rem', display: 'grid'}}>
                      <Card.Img variant="top" src={nftImage} alt= "Internal Server Error"style={{ width: '20rem' }} />
                      <Card.Body>
                      <Card.Title>Piece Name: {nftName}</Card.Title>
                      <Card.Text>
                      </Card.Text>
                      </Card.Body>
                      </Card>)
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
        <button type="submit">Enter Owner Address</button>
      </form>
      <div style={{display: 'grid', 'grid-template-columns': 'repeat(5, 1fr)',' grid-row-gap': '1rem'}}>{pics}</div>
      
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

