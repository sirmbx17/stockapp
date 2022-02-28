const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

// use body parser middleware
app.use(bodyParser.urlencoded({extended:false}));



// apiCall function
function apiCall(apiFinished,ticker){
	request('https://cloud.iexapis.com/stable/stock/'+ ticker + '/quote?token=pk_850005a482124c6a91d554c8bb3e7020',{json:true},(err,res,body) =>{
      if (err) {return console.log(err);}
      if(res.statusCode === 200){
      	apiFinished(body);
      };
});

};



// set handlebars middlware
app.engine('handlebars',exphbs.engine());
app.set('view engine', 'handlebars');

// api key pk_850005a482124c6a91d554c8bb3e7020


//set handle for main page
app.get('/', function (req,res){
	apiCall(function (apiDone){
	res.render('home',{
		stock : apiDone,
	});
  },'fb');
});


// set handle  post for index page
app.post('/', function (req,res){
	apiCall(function (apiDone){
	res.render('home',{
		stock : apiDone ,
	});
  }, req.body.stock_ticker);
});



// set handle for about page
app.get('/about.html', function (req,res){
	res.render('about');
});
//set  static folder
app.use(express.static(path.join(__dirname,'public')));

app.listen(PORT, () => console.log('Server Listening on port ' + PORT));