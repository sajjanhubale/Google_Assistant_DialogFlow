
### What is Google Assistant?
Google Assistant is a virtual personal assistant developed by google available on variety of devices like mobile phone, smart home device, on a smart watch or on a TV or even the web. It can engage in two way conversations and can work entirely with voice.

Next lets look at the functions. When user invokes the app by name or google matches the request to any of our intents, then it sends a request to our app with the intent and other parameters. In below function we will implement the promise function for intent.
```
'use strict'

const {dialogflow} = require('actions-on-google');
//const functions = require('firebase-functions');

const express = require('express');
const bodyParser = require('body-parser');
const expressApp = express();
const https = require('https');
var request = require('request');
const app = dialogflow()
expressApp.use(bodyParser.json({type:'application/json'}),app);


var jsonData=[]

app.intent('Default Welcome Intent', (conv) => {
  conv.ask('Hi! Welcome to FitInsure, How can I help you');
});


let getData= new Promise(function(resolve,reject){
      request({
                uri: 'https://17dedec0.ngrok.io/fetchTransaction',
                method: "POST",
                form: {
                  date: '2018-07-12',
                },
                headers:{
                        'Content-Type':'application/json',}

                }, function(error, response, body) {
                    if(error)
                     reject(error);
                    else
                     resolve(JSON.parse(body).result.premium);

              }); 
    });
    

app.intent('GetPremium', (conv) => {
return new Promise(function(resolve,reject){
    getData
      .then(function(premium){
          conv.ask('Your current premium ' + premium + 'Euros') ;
          resolve();
      })
      .catch(function(error){
          conv.close('Opps! Something wrong with server.Please try after some time') ;
          reject();
      })  
    })

});



//const app = dialogflow({debug: true});





if (module === require.main) {
  const server = expressApp.listen(process.env.PORT || 5000, () => {
    const port = server.address().port;
    console.log ('App listenting on port %s', port)
  });
}

```
