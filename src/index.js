const express = require('express')
const app = express()
const port = 8081
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;
require("dotenv").config()
app.get('/meet', (req, res) => {
async function main () {

  const oauth2Client =await new OAuth2(
    process.env.ClientId,
    process.env.ClientSecret,
    process.env.redirecturl
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
console.log("working...",url)
// res.writeHead(301,{Location:url})
res.redirect(301,url)
  }
  main().catch(console.error);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

