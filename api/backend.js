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
function myTokenData(name, description, owner,url){
    this.name = name
    this.description = description
    this.owner = owner
    this.url = url
}
/**
 * 
*/
function formatJSON(theJSON){
    let x
    let outPut = []
    for(x=0; x< theJSON.length; x++){
        let thisTokenData = new myTokenData(theJSON[x].token.name, 
            theJSON[x].token.description, 
            theJSON[x].token.owner, 
            theJSON[x].token.image.mediaEncoding.thumbnail)
            outPut.push(thisTokenData)
    }
    let astr= JSON.stringify(outPut)
    return astr
}

function formatInput(a){
    let resArr= Object.values(a)
    let targetStr = ""
    let x
    for(x = 0; x< resArr.length; x++){
        targetStr = targetStr + resArr[x]
    }
    return targetStr
}


app.get('/', (req, res)=>{
    res.end('you are seeing information on the screen congratulations')
})
/**
 * hitting this directly from express is just a spewed out JSON string of the info we will pass into react
 */


app.use('/api/nft', async (req, res, next) => {
    try {
        let { e } = req.body
        const inp = { e }
        const out = formatInput(inp)
        const qry = await fetchTokens(zdk, out)
        const qryString = JSON.stringify(qry, null, 3)
        const theNodes = JSON.parse(qryString).tokens.nodes
        const ourSend = formatJSON(theNodes) 
        console.log(ourSend)
        res.end(ourSend)
        } catch (error) {
        console.error("invalid query")
        res.send("this is bad")
        }


})

app.listen(port, console.log(`server is listening on port ${port}`))