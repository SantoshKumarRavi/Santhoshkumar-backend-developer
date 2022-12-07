const express = require('express')
const app = express()
const port = 8081
const {google} = require('googleapis');
var {OAuth2Client} = require('google-auth-library');
require("dotenv").config()
const oauth2Client = new OAuth2Client(
  process.env.CLIENTID,
  process.env.CLIENTSECRET,
  process.env.REDIRECTURL
);
const scopes = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.acls'
];
app.get('/rest/v1/calendar/init', (req, res) => {
async function main () {
  const url = await oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes:true
  });
res.redirect(307 ,url) //307 temp ... 301 permananet
  }
  main().catch(console.error);
})

app.get("/rest/v1/calendar/redirect",async(req, res) => {
  try{
    const {code}=(req.query) //hard_coded event
    const {tokens} =await oauth2Client.getToken(code)
    // console.log("withour accesstokens ",tokens)
    await oauth2Client.setCredentials(tokens)
    const calendar=google.calendar({version:'v3',auth:oauth2Client})
    let event={
      summary:"youth india asignment 2",
      location:"TN", 
      description:"backend project youth india",
      start:{dateTime:'2022-12-07T06:30:00.000Z'},//11am
      end:{dateTime:'2022-12-07T07:30:00.000Z'},//12pm
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
   
    calendar.events.insert({  auth:oauth2Client,calendarId:'primary',conferenceDataVersion: 1,resource:event},(err,eventData)=>{
      if(err){
        res.send(`Error while creating calendar`)
        console.log(err)
           return
      }
      if(eventData){
        res.send(`event data is added`)
      }
    })
  }catch(err){
    res.send(`some error in server ==>  ${err}`)
  }
    
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

