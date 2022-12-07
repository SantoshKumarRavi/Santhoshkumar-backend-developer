const express = require('express')
const app = express()
const port = 8081
const {google} = require('googleapis');
// const fs = require('fs').promises;
const OAuth2 = google.auth.OAuth2;
require("dotenv").config()
const {authenticate} = require('@google-cloud/local-auth');
// const path = require('path');
// const process = require('process');
// const CREDENTIALS_PATH = path.join(process.cwd(), "src/credential.json");
const oauth2Client = new OAuth2(
  process.env.CLIENTID,
  process.env.CLIENTSECRET,
  process.env.REDIRECTURL
);
// google.options({ auth: oauth2Client })
const scopes = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.acls'
];
app.get('/schedules', (req, res) => {
async function main () {
  const url = await oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes:true,
    // prompt: 'consent',
    // response_type:"code",
    // grant_type: 'authorization_code'
  });
// res.writeHead(307, { "Location": url });
res.redirect(307 ,url) //307 temp ... 301 permananet
  }
  main().catch(console.error);
})

app.get("/redirect",(req, res) => {
  const updatingrefresh=(async function gettingToken (){
    const {code}=(req.query)
    const {tokens} =await oauth2Client.getToken(code)
    console.log("withour accesstokens ",tokens)
    const updatingrefresh=await oauth2Client.setCredentials({
      refresh_token:tokens.refresh_token
    }
    )
    return await updatingrefresh
  })()
  
  // const accesstokens=await oauth2Client.getAccessToken()
  // const refersh =await oauth2Client.refreshAccessToken()
  // const token_info =await oauth2Client.getTokenInfo()
// res.send("event updated")
// return
//   const client = await google.auth.getClient()

// client.on('tokens', (tokens) => {
//   if (tokens.refresh_token) {
//     // store the refresh_token in my database!
//     console.log(tokens);
//   }
//   // console.log(tokens);
// });
  // console.log("withour refersh ",refersh)
  // console.log("withour token_info ",token_info)
  // async function quickstart() {
  //   const localAuth = await authenticate({
  //     scopes:scopes,
  //     keyfilePath:CREDENTIALS_PATH,
  //   });
  //   console.log('Tokens:', localAuth.credentials);
  // }
  // quickstart();

  
  // callback(oauth2Client)
  //getting refresh token implement(as of now using acces token)
    //setting events
  // function callback(oauth2Client){
    const calendar=google.calendar({version:'v3',auth:updatingrefresh})
    let event={
      summary:"youth india asignment",// title 
      location:"TN", 
      description:"backend project youth india", //description
      start:{dateTime:1670387400000},//10am
      end:{dateTime:1670391000000},//11am
      timeZone:'Asia/Kolkata',
      colorId:3,
      attendees:[{"email":"shanthoshravi01@gmail.com"},{"email":"drsanthosh1997@gmail.com"}],//emails
      conferenceData: {
          createRequest: {
              requestId:"gmeet",
              conferenceSolutionKey: {
                  type:"hangoutsMeet"
              }
          }
      }
    }
    // calendar.freebusy.query({
    //   resource:{
    //       timeMin:1670387400000, //10am
    //       timeMax:1670391000000, //11am
    //       timeZone:'Asia/Kolkata',
    //       items:[{id:'primary'}],
    //   },
    // },(err,freebusyResult)=>{
      // if(err){
      //   console.error("before free busy error")
      //     return console.error("free busy ====>",err)
      // }
      // const eventArr=freebusyResult.data.calendars.primary.busy
      // if(eventArr.length==0){
          // console.log("here wauit from if part,,,,,,,")
    calendar.events.insert({  auth: oauth2Client,calendarId:'primary',conferenceDataVersion: 1,resource:event},(err,eventData)=>{
      if(err){
        res.send(`Error while creating calendar`)
        console.log(err)
           return
      }
      // console.log("before event update")
      if(eventData){
        res.send(`event data is added`)
      }
    })
    
    // }
    // else{
    //   res.send(`event data is not added, he/she is busy at this schedule`)
    // }
    // }
    // )
  // }    
    // .catch.....
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

