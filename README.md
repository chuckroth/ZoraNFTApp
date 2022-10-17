# ZoraNFTApp

## Overview

### This Project Is an Application that uses the Zora API to display a gallery of a user's NFTs

## Backend

Our backend has two Express routes '/' and '/api/nft' the latter destructs the body of our request, formats it into a viable string to query Zora
and fetches our API data. If we pass in a string that does not correspond with a user's address the function returns this bad in the catch portion of the function. If it is successufl we parse the JSON Data to only return nodes. our backend also has an object called myTokenData which holds the nft info we want including the urls to embed into our src's once these are passed in as images. In our formatJSON function we take the resultant JSON info from zora and
create an array of myTokenData's which is then sent back to the front end.

## Frontend

The Front end uses the React Framework and the majority of the code I wrote is in
src/Form.js as well as one update to the package.json to allow for a proxy sever which is being used by my Express routes

### Form.js

Form.js is a javascript function that returns a form. The form has an onChange function which takes each character of the input and passes
that into our useState function getNFT to create our state, {name} Our button is set to type submit, so it can use the OnSubmit function in our form
The OnSubmit function passes our input into our async function getGal. getGal imports axios to pass our input into our backend. If it is successfully able to
put our input into the backend it will either receive an array of Objects for our NFT data or a string that says "this is bad".
"this is bad" passes in the text "Bad Query" into our onSubmit function and sets the state of the body of our text to "BadQuery". If we have receive an array of
objects we iterate through the array and store each objects value into two consts and push it out into our Card Class body. The resultant app then displays our state
which is an array of cards
