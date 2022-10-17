import {ZDK} from "@zoralabs/zdk"
import express from "express"
/**
 * I cant make comments in the package.json on the client folder...
 * i'm using a proxy server 
 * instead of importing cors because this is a single page app
 */
const port = 5150
const app = express()
//using the ZDK to make query
const zdk = new ZDK("https://api.zora.co/graphql");
app.use(express.json())



//no longer relevant but i was using modules instead of commonjs so i could use top level await with this
async function fetchTokens(zdk, ownerAddresses){
    return await zdk.tokens({where: {ownerAddresses}})
} 




function myTokenData(name, owner,url){
    this.name = name
    this.url = url
}

/**
 * submit form is set to onChange so the input is passed as an array of each character
 * This takes the array of characters passed in and makes it viable to be sent into the function
 */
function formatInput(a){
    let resArr= Object.values(a)
    let targetStr = ""
    let x
    for(x = 0; x< resArr.length; x++){
        targetStr = targetStr + resArr[x]
    }
    console.log(targetStr)
    return targetStr
}


function formatJSON(theJSON){
    let x
    let outPut = []
    for(x=0; x< theJSON.length; x++){
        let thisTokenData = new myTokenData(theJSON[x].token.name, 
            theJSON[x].token.name, 
            theJSON[x].token.content.url) 
            outPut.push(thisTokenData)
    }
    let astr= JSON.stringify(outPut)
    return astr
}

app.get('/', (req, res)=>{
    res.end("the app is running")
})
app.use('/api/nft', async (req, res, next)=>{
    try {
        let { e } = req.body
        const inp = { e }
        const out = formatInput(inp)
        const qry = await fetchTokens(zdk, out)
        const qryString = JSON.stringify(qry, null, 3)
        const theNodes = JSON.parse(qryString).tokens.nodes
        const ourSend = formatJSON(theNodes) 
        res.send(ourSend)
    } catch (error) {
        console.error(error)
        res.send("this is bad")
    }
    
})

app.listen(port, ()=>{
    console.log(`Currently listening on ${port}`)
})