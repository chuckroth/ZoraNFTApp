import {ZDK} from "@zoralabs/zdk"
import express from "express"

const port = 5150
const app = express()
const zdk = new ZDK("https://api.zora.co/graphql");
app.use(express.json())

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
app.use('/api/nft', (req, res, next)=>{
    res.end(JSON.stringify(loopLinks()))
})
app.use('/hey_honey', async (req, res, next) => {
    let { name } = req.body
    let resArray = Object.values(name)
    let targetString = ""
    let x
    for(x = 0; x< resArray.length; x++){
        targetString = targetString + resArray[x]
    }
    let broken = await fetchTokens(zdk, targetString)
    let submittedForm = JSON.stringify(broken, null, 3)
    //console.log(submittedForm)
    console.log({ name })
    const allTokens = JSON.parse(submittedForm).tokens.nodes
    let theTokens = () =>{
        let theCollection = Object.keys(allTokens).length
        return theCollection
    }

    function tokenInf(num, url){
        this.num = num
        this.url = url
    }

    let y;
    let allUrls = () =>
    {
    let output =[]
        for(y =0;y<theTokens(); y++) {
        let newToken = new tokenInfo(y, JSON.stringify(allTokens[y].token.image.mediaEncoding.thumbnail))
        output.push(newToken)
        }
        return output
    }
    console.log(JSON.stringify(allUrls()))
    res.send(JSON.stringify(allUrls()))

})

app.listen(port, console.log(`server is listening on port ${port}`))