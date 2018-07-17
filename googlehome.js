// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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




app.intent('GetPremium', (conv) => {
return new Promise(function(resolve,reject){
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
//exports.yourAction = functions.https.onRequest(app);
