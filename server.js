
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const signin = require('./controllers/signin');

const db = knex({
	client: 'pg',
	connection:{
		host: '127.0.0.1',
		user:'postgres',
		password: 'pass@123',
		database:'SmartBrain'
	}
});

/*db.select('*').from('users').then(data => {
	console.log(data);
});*/



const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// ROOT GET
app.get('/', (req, res)=>{
	res.send('Welcome!!!');
})


// SIGNIN POST
app.post('/signin',(req, res) => { signin.handleSignin(req, res, db, bcrypt) })

// REGISTER POST
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

// PROFILE GET
app.get('/profile/:id',(req, res) =>{profile.handleProfile(req,res,db)})

// IMAGE PUT
app.put('/image',(req, res) =>{image.handleImage(req,res,db)} )

// IMAGE POST
app.post('/imageurl',(req, res) =>{image.handleAPICall(req,res)} )


var port = process.env.PORT || 3001
app.listen(port, ()=>{
	console.log('This App is running on port ' + port + ' Press CTRL + C to treminate');
});

module.exports = app

 
