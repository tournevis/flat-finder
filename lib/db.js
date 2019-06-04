const mysql = require('mysql')
const Flat = require('./flat.js')

class DB {
	constructor (conf) {
		this.conf = conf
		this.connection = {}
		this.flatsTable = 'flats'
		this.flatsDatabase = 'flats_finder'
		this.init()
	}
	init() {
		this.connection = mysql.createConnection(this.conf)
		this.connection.connect()
		this.setDatabase()
		this.setTable()
	}
	setDatabase () {
		this.connection.query(`CREATE DATABASE IF NOT EXISTS ${this.flatsDatabase}`)
		this.connection.query(`use ${this.flatsDatabase}`)
	}
	setTable () {
		this.connection.query(
			`CREATE TABLE IF NOT EXISTS ${this.flatsTable} (` + Flat.getModel() + ")"
		)
	}

	add (flat, cb) {
		var count = 0
		return this.connection.query(`SELECT * FROM ${this.flatsTable} WHERE flat_id = ${flat.flat_id}`,  (error, results, fields) => {
		  	if (error) throw error;
			if (results.length == 0) this.insert(flat)			
		})
	}
	insert(flat) {
		this.connection.query(`INSERT INTO ${this.flatsTable} SET ?`, flat, function (error, results, fields) {
			if (error) throw error;
		  	return results
		})
	}
}
module.exports = DB