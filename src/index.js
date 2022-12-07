const express = require('express')
const app = express()
const port = 8081
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;

app.get('/meet', (req, res) => {



async function main () {
let ClientId="197291748005-usi6ej087djrpcsqphpfrj5bucvskvrm.apps.googleusercontent.com"
let ClientSecret="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"
let redirecturl="http://localhost:8081/"
const oauth2Client =await new OAuth2(
    ClientId,
    ClientSecret,
    redirecturl
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

