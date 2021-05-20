require('dotenv').config()

module.exports = {
	PORT: process.env.PORT || 5000 ,
	DATABASE: {
		host: process.env.DATABASE_HOST,
		user: process.env.DATABASE_USER ,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_DB ,
		port: process.env.DATABASE_PORT
	},
	JWT_KEY: process.env.JWT_KEY
}