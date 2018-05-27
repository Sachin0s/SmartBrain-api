const handleSignin = (req, res, db,bcrypt)=>{
	
	const {email, password} = req.body;


	if(!email || !password){
		return res.status(400).json('Please enter all values');
	}

	db.select('email','hash').from('login').where('email','=', email)
		.then(data => {
			const IsValid = bcrypt.compareSync(password, data[0].hash)
			if(IsValid){
				return db.select('*').from('users').where('email','=',email)
					.then(user => {
						res.json(user[0])
					})
					.catch(err => res.status(400).json('Un able to get user'))
			} 
			else{
				res.status(400).json('Incorrect credentials')
			}
		})
		.catch(err => res.status(400).json('Wrong username and password'))
}

module.exports ={
	handleSignin: handleSignin
}