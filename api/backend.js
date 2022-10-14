import {ZDK} from "@zoralabs/zdk"
import express from "express"

const port = 5150
const app = express()
const zdk = new ZDK("https://api.zora.co/graphql");

/*using built-function fetchTokens 
which uses graphql and collectionaddresses to query a collectionAddresses token info
*/
async function fetchTokens(zdk, collectionAddresses){
    return await zdk.tokens({
      where: {
        collectionAddresses
      }
    })
  } 
  
/**
 * I am using modules to utilize top level await
*/
const tokens = await fetchTokens(zdk, '0x42069ABFE407C60cf4ae4112bEDEaD391dBa1cdB')
/**
 * This function allows me to get the size of the 'node' array in the JSON 
 * so we get the exact amount of NFT urls corresponding to the collectionAddress
*/
let nftGallery = JSON.stringify(tokens,null,3)
const everyToken = JSON.parse(nftGallery).tokens.nodes
let theTokens = () =>{
    let theCollection = Object.keys(everyToken).length
    return theCollection
}

function tokenInfo(num, url){
    this.num = num
    this.url = url
}

let x;
let loopLinks = () =>
{
  let output =[]
    for(x =0;x<theTokens(); x++) {
    let newToken = new tokenInfo(x, JSON.stringify(everyToken[x].token.image.mediaEncoding.thumbnail))
    output.push(newToken)
    }
    return output
}


app.get('/', (req, res)=>{
    res.end('you are seeing information on the screen congratulations')
})
/**
 * hitting this directly from express is just a spewed out JSON string of the info we will pass into react
 */
app.use('/api/nft', (req, res)=>{
    res.end(JSON.stringify(loopLinks()))
})
app.listen(port, console.log(`server is listening on port ${port}`))