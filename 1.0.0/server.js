'use strict';

const express = require('express');
const request = require('request');
// Constants
const PORT = ${PORT};
const HOST = '0.0.0.0';
const TABLEAU_HOST = "${TABLEAU_HOST}"
const USERNAME = "${USERNAME}"
//const ENDPOINT ="${ENDPOINT}"
const IFRAME_WIDTH = "${IFRAME_WIDTH}"
const IFRAME_HEIGHT = "${IFRAME_HEIGHT}"
// App
const app = express();

var requestToken = function (req, res, next){
	var clientServerOptions = {
		uri: 'http://'+TABLEAU_HOST+'/trusted',
		body: 'username='+USERNAME,
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}
	request(clientServerOptions, function (error, response) {
		if(response != null){
			var token = response.body
			console.log('Token: ',response.body);
		}else{
			var token = null
			console.log('Error: ',error);
		}
		req.errorFromRequestToken = error
		req.requestToken =  token;
		next();
	});
}
app.use(requestToken)


app.get('/report/:folder/:item', (req, res) => {
  if( req.errorFromRequestToken == null ){
	if( req.requestToken != "-1" ){
	  	var responseText = "<iframe src='http://"+TABLEAU_HOST+"/trusted/"+req.requestToken+"/views/"+req.params.folder+"/"+req.params.item+"?:embed=yes&:toolbar=no&:showShareOptions=false' width='"+IFRAME_WIDTH+"' height='"+IFRAME_HEIGHT+"'></iframe>"
	}
	else{
		var responseText = "The Token cannot get from "+TABLEAU_HOST+" Please check with Tableau admin"
	}
  }else{
	var responseTest= "Cannot connect to "+TABLEAU_HOST+" Please check with Tableau admin"
  }
  res.send(responseText)
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
