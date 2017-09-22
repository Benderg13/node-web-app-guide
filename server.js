var bodyParser = require('body-parser')
var express = require('express')
var loki = require('lokijs')
var todoItems = require('./routes/todo-items')()

global.db = new loki('data/todo.json', {
  autoload: true,
  autoloadCallback : autoloadCallback,
  autosave: true,
  autosaveInterval: 1000
})

var app = express()

function autoloadCallback(){
	app.use(bodyParser.json())
	app.use('/todoItems', todoItems)

	app.use('/', express.static('./public'))
	app.use('/js', express.static('./node_modules/bootstrap/dist/js'))
	app.use('/js', express.static('./node_modules/jquery/dist'))
	app.use('/js', express.static('./node_modules/lokijs/src'))
	app.use('/css', express.static('./node_modules/bootstrap/dist/css'))

	app.listen(4321, function(){
	  console.log('Todo App is listening on port 4321!')
	})
}