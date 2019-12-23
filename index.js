
const express = require('express');

const bodyParser = require('body-parser');

const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended : true})) ;

app.listen(3000, function(){
  console.log('Server is up at port 3000');
});

app.get("/", function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req,res){

  var amount = req.body.amount;

var options = {
  url : 'https://apiv2.bitcoinaverage.com/convert/global',
  method : 'GET',
  qs : {
    from : req.body.crypto,
    to : req.body.fiat,
    amount : amount
  }
};

  request(options , function(error, request, body){

    var data = JSON.parse(body);

    var price = data.price;

    console.log(price);

    res.write('The current date is ' + data.time + '\n');


    res.write('The price of ' +req.body.amount + ' ' + req.body.fiat + ' of ' + req.body.crypto + ' in ' + req.body.fiat + ' is ' + price);

    res.send();

  });
})
