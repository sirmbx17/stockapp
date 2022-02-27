const express = require('express')
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');

const PORT = process.env.PORT || 5000;

// set handlebars middlware
app.engine('handlebars',exphbs.engine());
app.set('view engine', 'handlebars');

const test2  = "test2";
//set handle
app.get('/', function (req,res){
	res.render('home',{
		stuff : mama });
});

//set  static folder
app.use(express.static(path.join(__dirname,'public')));

app.listen(PORT,() => console.log('Server listening on port'+ PORT));