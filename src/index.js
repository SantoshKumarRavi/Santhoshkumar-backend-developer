const express = require('express')
const app = express()
const port = 8081
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;
require("dotenv").config()


// app.get('/', (req, res) => {
//   console.log(req.query)
// res.send("working , ur authorized")
// })

app.get('/meets', (req, res) => {
async function main () {

  const oauth2Client =await new OAuth2(
    process.env.CLIENTID,
    process.env.CLIENTSECRET,
    process.env.REDIRECTURL
);
const scopes = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.acls'
  ];
  const url = await oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes:true

  });
//   const {tokens} =await oauth2Client.getToken(code)
//   console.log(tokens)
// console.log("working...",url)
// res.writeHead(301,{Location:url})
res.redirect(301 ,url) //307 temp ... 301 permananet
// res.send("hi get")
  }
  main().catch(console.error);
})

app.get("/redirect",async(req, res) => {
  const oauth2Client =await new OAuth2(
    process.env.CLIENTID,
    process.env.CLIENTSECRET,
    process.env.REDIRECTURL
);
  const {code}=(req.query)
  const {tokens} =await oauth2Client.getToken(code)
  console.log(tokens)
  res.send(`working refiertct , ur authorized here is the token}`)
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

