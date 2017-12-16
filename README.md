# Node Web App Guide

## About

I created this guide to help with training at my job. It largely uses tools that we happened to be using there. However, I've tried to describe the general purpose of the tools used, and provide alternatives. At the end of this guide, you should understand common concepts and terminology related to creating web apps. You should also be able to implement a web app with Node.

## Assumptions

You should be moderately familiar with JavaScript and jQuery, HTML, CSS, the command line, and performing common file system tasks like creating directories.

## Important

Try not to get caught up on any particular details along the way. If you find you don't understand something, consult the appropriate documentation. This is good programming advice in general. The complete working code described in this guide is provided, so you can always compare your work to that if you get lost along the way.

## Introductory Ideas

Before implementing any code, let's look at the bigger picture of what a web app consists of, and therefore what goes into making one.

### Client-Server Application Model

There are various application models, such as traditional desktop applications (think Microsoft Word) and client-server applications (think Microsoft Outlook). The distinction largely lies in the location of the resources used by the application. Desktop applications use resources stored on the computer they are installed on (Word stores your documents locally). In contrast, a client communicates over a network to request resources from a server (Outlook displays your emails that it requests from an email server). Your browser also uses the client-server model. It is a client that displays HTML documents requested from a web server. In all but the most basic web apps, web servers also handle client requests for other data, in addition to HTML documents.

### What We Need To Create

We know that a web app consists of a client and a server. The client is a browser running HTML files that we create. The server sends those HTML files to the browser when a user navigates to our webpage. The server also sends additional data to the browser as it is requested. We don't need to create a browser, as those are readily available. We do need to create the HTML files used by the browser, and the server that handles client requests.

### Some Thoughts On Tools

There are many tools available that make our job easier, so we don't have to start from scratch. For the most part, there are lots of options for which tools to use. The only tools really set in stone for web apps are HTML and its linked resources, such as JavaScript. Those can't be changed. The client component of web apps is always created using those tools as its base. We will also use additional tools to make our lives easier. For creating the server component, however, there are many options. It is uncommon to create a web server from scratch, as doing so requires significant knowledge of web protocols and socket programming, and there is no need to reinvent the wheel. Instead, it is normal to build the server component of a web app on top of existing web servers such as [Apache](https://httpd.apache.org/), [IIS](https://www.iis.net/), and [Express](https://expressjs.com/). As this is a Node guide, we will be using Express, which is a popular web server used in a Node environment. Express is actually a framework, a term which will be defined in a later section.

### JavaScript Runtime Environments

[Node](https://nodejs.org/en/) is one JavaScript runtime environment. A browser is another. JavaScript can run in Node or a browser. The difference is the additional objects and functions that are made available to the JavaScript code. In a browser, for example, the Window object is available. In node, the process object is available. All our server code will run in Node. All our client code will run in the browser.

### Packages

When creating software, you often run into problems that have already been solved many times over by others. Luckily, software developers realize this, and have created tools, known as [package managers](https://en.wikipedia.org/wiki/Package_manager), that makes it easier to share their software solutions with others. They do so by organizing their software solutions into a grouping called a package, and publishing it to a package manager. This allows other users of the package manager to install the published package and use it in their own software projects. Generally speaking, a package manager is a tool for installing software and managing its dependencies. There are many package managers, including [dpkg](https://help.ubuntu.com/lts/serverguide/dpkg.html), [Homebrew](https://brew.sh/), [RubyGems](https://rubygems.org/), [NPM](https://www.npmjs.com/) (Node Package Manager), and [Bower](https://bower.io/). Each serves a slightly different purpose that it was designed to best handle. Two common package managers used in Node development are NPM, for server-side packages, and Bower, for client-side packages. NPM can also be used for client-side packages, and in this guide we will be using it for all of our package-management needs.

### Modules

Packages provide a way for software developers to share their code. Packages, however, do not enforce any kind of common structure on that code, that will make it easier for others to use. That's where modules come in. Modules wrap code with an interface that is well defined, so users of the module will know which functions and objects the module provides. Also, a module system manages all installed modules and allows software developers to easily access them wherever they need to. There are two main JavaScript module specifications, [AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md), which works well in browsers, because it is asynchronous, and [CommonJS](https://en.wikipedia.org/wiki/CommonJS), which is synchronous. Node uses an implementation of the CommonJS specification for its module system. We do not need to worry about AMD in this guide, because we will be using a tool called Browserify, which allows us to write Node modules, and have them work in the browser.

### Frameworks

There is some disagreement as to the exact definition of a [framework](https://en.wikipedia.org/wiki/Software_framework) as opposed to a [library](https://en.wikipedia.org/wiki/Library_(computing)). Some say that the defining characteristic of a framework is the [inversion-of-control principle](https://en.wikipedia.org/wiki/Inversion_of_control), which means that whereas [client code](https://stackoverflow.com/questions/13912438/what-is-client-code-in-java) calls a library, a framework calls client code. The term does get used a bit more loosely than that and it is difficult to nail down its exact definition. In one sense, frameworks are generic software that provide an overall application structure, control flow, and set of functionality that can be built on top of and customized. Frameworks are common place in web development because web apps can become complex quickly, and frameworks help to manage that complexity.

Separating an application's data from its user interface is one example of such complexity that a framework can help to manage. A general pattern for handling this problem is called [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) (Model View Controller). We will be using a framework called [Backbone](http://backbonejs.org/) that makes use of this pattern. Backbone solves the generic problem of providing us with structures like models and views, but also allows us to customize them to our needs. Other common frameworks for solving this problem are [Angular](https://angularjs.org/) and [React](https://facebook.github.io/react/).

Another example of complexity that is made easier by a framework is the styling of the user interface. You'll notice the term framework is being used loosely here. A [CSS framework](https://en.wikipedia.org/wiki/CSS_framework) addresses this problem. Popular CSS framworks include [UIKit](https://getuikit.com/) and [Bootstrap](https://getbootstrap.com/). In this guide, we will be using Bootstrap.

### Single Page Application

The traditional model of websites and web apps consisting of multiple pages was such that each page was a separate HTML document that the browser would individually request from the server as needed. Any data that needed to be displayed on a page would be added to the HTML document server-side before it was sent. That model is still in use, but there is another model, the single-page application, that is becoming more and more common. Instead of the client requesting a separate HTML document from the server for every view, it displays only one HTML document, and swaps out the view that is currently displayed within the document as needed. The MVC framework that we will be using, Backbone, provides a structure, the client-side router, that simplifies the navigation between these views. One of the benefits of a single-page application is that it feels more like a traditional desktop application.

### Requesting Data Over HTTP, AKA REST

As a user navigates to different views within a web app, data required by those views needs to be requested from the server. Web clients and servers communicate via the [HTTP protocol](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol). A protocol is an agreed-upon sequence of messages, responses, and actions based upon those messages and responses. Greeting someone in the morning with "good morning" and receiving the response "good morning" can be thought of as the protocol for a morning greeting. HTTP's [methods](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) correspond nicely with the standard  [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) operations needed for working with data. An API that uses HTTP in this way is often called RESTful. In fact, [REST](http://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven) is a set of principles that was developed along with HTTP and actually has a more precise definition than is acknowledged in common use. Nevertheless, RESTful API is likely to continue being a common term. The application that we will be creating in this guide will require that our client request data from our server via a RESTful API. Our server framework, Express, provides a server-side router construct (not to be confused with Backbone's client-side router construct) that was designed to handle HTTP requests, and therefore works well for implementing a RESTful API.

### Task Runners

In the context of Node, task runners let you run JavaScript functions from the command line. This is useful for automating processes that would usually need to be performed manually. Examples of popular task runners are [Grunt](https://gruntjs.com/) and [Gulp](https://gulpjs.com/). We will be using Gulp to perform the task of watching our source files for changes, and rerunning Browserify when changes occur. As noted in an earlier section, Browserify allows us to write Node modules and have them work in a browser environment.

## Creating The Application

### What We Are Creating

A common type of example application is a todo list application, and that's what we'll be creating.

### Strategy

Now that we are familiar with some foundational concepts, let's get to the actual work of implementing our web app. First, we'll install the packages we'll need to build our application. Then, we'll work on getting our application up and running in a minimal fashion, simply displaying the message "Hello, world!", to get a sense of how everything fits together. As a convenience, we'll set up the Gulp task for watching our files.

We'll then build out the functionality of our app, adding more complex views and a client-side router for managing navigating between them.

Finally, we'll create the REST API endpoints on the server that the client will use to save new todo items and retrieve a listing of existing todo items.

### Package Installation

At this point, if you don't have Node installed, get it now [here](https://nodejs.org/en/). Once it's installed, continue.

Create a root folder for our web app called todo-list-app.

When we installed Node, NPM, which is a command line application, was also installed. So let's get all the packages we will need by executing the following commands. We will explain each one as necessary throughout the course of the guide. So, open a command line and navigate to the todo-list-app folder, then execute the commands.

```
$ npm install -g browserify

$ npm install express --save
$ npm install backbone --save
$ npm install body-parser --save
$ npm install bootstrap --save
$ npm install jquery --save

$ npm install gulp --save-dev
$ npm install handlebars --save-dev
$ npm install hbsfy --save-dev
$ npm install shelljs --save-dev
```

It should be clear that 'npm install' installs a package. The -g flag tells NPM to install the package on our computer, so it is available to any command line. The --save and --save-dev flags tell NPM to add the package name to list of dependencies in a package.json file, in the dependencies and developer dependencies sections, respectively.

### Creating Our Folder Structure

Within our project folder, create the following folder structure. Items without an extension are folders. For the files, just create empty files for now. Each item will be explained throughout the course of the guide.

```
node-web-app
	data
	public
		collections
		library
		models
		routers
		templates
		views
		index.html
		index.js
	routes
	gulpfile.js
	server.js
```

### Creating Our Automated Bundler Task

The raw JavaScript files created during development are often not the actual files that are sent to a browser. Instead, often for performance reasons, they are transformed in various ways, which can have benefits like reducing file sizes and bundling all JavaScript code into one file, reducing the number of required server requests. Besides allowing us to use Node modules in the browser, Browserify bundles all JavaScript files into one file in this way. So that we don't have to manually rerun the Browserify command every time we make a change, we create a watcher task which reruns Browserify automatically every time we make a change.

Add the following code to gulpfile.js.

```
var fs = require('fs')
var gulp = require('gulp')
var shell = require('shelljs')

gulp.task('watch', bundleThenWatch)

function bundleThenWatch(){
	bundle()
	watch()
}

function bundle(){
	var browserifyCommand = 'browserify -t hbsfy ./public/index.js > ./public/bundle.js'
	shell.exec(browserifyCommand)
}

function watch(){
	var filesToWatch = [
		'./public/collections',
		'./public/library',
		'./public/models',
		'./public/routers',
		'./public/templates',
		'./public/views',
		'./public/index.html',
		'./public/index.js'
	]
	filesToWatch.forEach(function(file){
		fs.watch(file, bundle)
	})
}
```

There are a few important lessons this file can teach us. First, we can learn how to use Node modules. We gain access to a module by using the 'require' function with the name of the module passed as an argument. The require function simply returns whatever value, usually an object or a function, that the author of the module chose to export (we'll cover exporting when we create our own modules).

Note that although we did not have to run the command 'NPM install fs' (for file system), we are able to require it as a module here. That is because Node comes preinstalled with many modules.

We need the gulp module because we are creating a Gulp task. We need the shell module because our task will execute Browserify, which is a command line application. To create a Gulp task that can be executed from the command line, simply use gulp.task('{task name}', {function to execute}). As you can see, our task is named 'watch' and it executes the 'bundleThenWatch' function. We can type 'gulp watch' into the command line and it will run this task.

The Browserify command within the 'bundle' function is doing a few things. It is taking index.js as input and creating bundle.js as output. The -t flag is telling Browserify to use the hbsfy plugin to precompile any Handlebars templates that it finds, which allows us to use the templates in our JavaScript code.

Before you continue, run gulp watch in the command line.

### Setting Up The Server

In order for the browser to display a webpage, it has to request it from the server, so let's start setting up our server. Our server code will be in server.js.

Place the following code into server.js.

```
var express = require('express')

var app = express()

app.use('/', express.static('./public'))
app.use('/js', express.static('./node_modules/bootstrap/dist/js'))
app.use('/js', express.static('./node_modules/jquery/dist'))
app.use('/css', express.static('./node_modules/bootstrap/dist/css'))

app.listen(4321, function(){
  console.log('Todo App is listening on port 4321!')
})
```

The code in server.js starts a web server and makes our 'public' folder accessible to a browser. Now that we have our server, we need something to display. Let's keep it simple for now. So, open index.html and add the text 'Hello, world!'. Then at the command line type 'node server' to start the server. Then, in your browser, navigate to localhost:4321 and you should see the text 'Hello, world!'. We have a basic client-server web app running.

### Master View Container

Remember that we are using Backbone to create and manage views. We have to place these views somewhere within the HTML document of our single-page application. For this purpose, we will create one master view, called the 'app' view, that will serve as the container for all other views.

Let's do that now. Create the following two files.

```
./public/views/app.js
./public/templates/app.hbs
```

The view file is the file in the 'views' folder. Generally speaking, each view will have a corresponding template in the 'templates' folder. Using templates allows us to separate a view's structure from the data that it displays.

For our purposes, it is mostly just an HTML file. The difference is that we include words between curly braces. These serve as placeholders where we can later pass in the actual data to be displayed.

In the template file, put the following code.

```
<div id="app">
	<div class="page-header"><h1>{{appName}}</h1></div>
	<div id="main"/>
</div>
```

In the view file, put the following code.

```
var Backbone = require('backbone')

var App = Backbone.View.extend({
	template: require('../templates/app.hbs'),

	render: function(options){
		this.setElement(this.template(options))
		return this
	}
})

module.exports = App
```

The app view is our first Node module. All that means in practice is that somewhere in this file we assign a value to module.exports. When we do that then someone can include this file with the require function, which will return the value that we assign to module.exports. In this case, we are exporting a Backbone view constructor function called App. Users of this module will be able to create app view objects with the App constructor function.

Backbone is consistent in the syntax that it provides for extending its built-in objects (actually constructor functions for objects). In this case, we are using 'Backbone.View.extend' to extend Backbone's build-in view object, in order to create an app view. If we needed to extend another type of object, such as a model, we would do 'Backbone.Model.extend'. As an argument, the extend function takes an object, which defines things such as new attributes and functions objects of the new type will have.

Let's inspect the object we are passing to 'Backbone.View.extend'. By convention, give the view a function called 'template', and a function called 'render'.

We can simply set our template function equal to the value (a function) returned by requiring app.hbs because, as mentioned in an earlier section, our Browserify command is using the hbsfy plugin to precompile our Handlebars files into JavaScript functions.

Backbone views have an 'el' attribute that is a reference to a DOM element. The render function is used to set that DOM element, in this case via the 'setElement' function. The value we are setting is an HTML string produced by the render function, using the view's template, replacing placeholder values with values in the 'options' object.

We need to do a few more things in order to display this view. Add the following code to index.js. Feel free to provide your own app name.

```
var App = require('./views/app')

var app = new App()
$(document.body).html(app.render({ appName: 'Todo App' }).el)
```

Lastly, replace the contents of index.html with the following.

```
<html>
	<head>
		<title>Node Web App Guide</title>
		<link rel="stylesheet" href="css/bootstrap.css" />
		<script src="js/jquery.js"></script>
		<script src="js/bootstrap.js"></script>
	</head>
	<body>
		<script src="bundle.js"></script>
	</body>
</html>
```

Now you should be able to navigate back to the app in a browser and have the view display.

### Models And Collections

Before adding more views, we'll add the model and collection objects that the views will need. Creating models and collections follows the same pattern as creating Backbone views, which is  extending a Backbone class with an object literal. Within the object literal, we are settings some default values, one of which is the 'id' attribute. For now (until we add the database in a future section), we are simply incrementing the 'id' attribute for each new model.

Create the file public/models/todo-item.js and add the following code to it.

```
var Backbone = require('backbone')

var id = 0

var TodoItem = Backbone.Model.extend({
	defaults: function(){
		id++
		return {
			id: id,
			text: 'New todo item.'
		}
	}
})

module.exports = TodoItem
```

Create the file public/collections/todo-items.js and add the following code to it.

```
var Backbone = require('backbone')

var TodoItems = Backbone.Collection.extend({
	name: 'todoItems',

	model: require('../models/todo-item')
})

module.exports = TodoItems
```

### Views

This is a large section, but it does not introduce much new information that we have not already covered. We will be adding 'todo item' and 'todo items' views and their corresponding templates. We're also adding a 'list item' (admittedly not a great name) template for list items displayed on the 'todo items' view. We don't need a list item view because we don't need any custom logic for a list item. We're also adding a client-side router for navigating between views. Lastly, we'll update the app view to use our client-side router.

Create the file public/views/todo-items.js and add the following code to it.

```
var Backbone = require('backbone')
var listItemTemplate = require('../templates/list-item.hbs')
var TodoItemModel = require('../models/todo-item')

var ToDoItems = Backbone.View.extend({
	template: require('../templates/todo-items.hbs'),

	events: {
		'click #add': 'add'
	},

	initialize: function(){
		this.collection.on('update', this.renderListItems.bind(this))
	},

	render: function(){
		this.setElement(this.template())
		this.renderListItems()
		return this
	},

	renderListItems: function(){
		var $listGroup = this.$('.list-group')
		$listGroup.html('')
		this.collection.forEach(function(todoItem){
			var renderedListItem = listItemTemplate(todoItem.toJSON())
			$listGroup.append(renderedListItem)
		})
	},

	add: function(){
		var todoItem = new TodoItemModel
		this.collection.push(todoItem)
	}
})

module.exports = ToDoItems
```

The 'todo items' view introduces a few new things. It uses the 'events' property to add the click handler for the 'add' button. This is a convenient notation provided by Backbone for binding UI events. We also use the 'initialize' function, which is part of the Backbone framework, and is called when a new object is created. In it, we bind an 'update' event handler to the collection's 'update' event. This is so the list of todo items is redrawn when the collection is updated. In the 'renderListItems' function, the collection of todo items is being iterated over, and a UI element is being templated for each one.

Create the file public/templates/todo-items.hbs and add the following code to it.

```
<div>
	<div class="panel panel-default">
	  <div class="panel-body">
			<form>
				<button id="add" type="button" class="btn btn-default pull-right">+</button>
			</form>
	  </div>
	</div>
	<ul class="list-group">
	</ul>
</div>
```

Create the file public/templates/list-item.hbs and add the following code to it.

```
<a href="/#/todoItem/{{id}}">
	<li class="list-group-item">{{text}}</li>
</a>
```

Create the file public/views/todo-item.js and add the following code to it.

```
var Backbone = require('backbone')

var ToDoItem = Backbone.View.extend({
	template: require('../templates/todo-item.hbs'),

	events: {
		'submit': 'save',
		'click #delete': 'delete',
		'click #cancel': 'cancel'
	},

	render: function(){
		this.setElement(this.template(this.model.toJSON()))
		return this
	},

	save: function(){
		var text = this.$('#todo-item-text').val()
		this.model.set('text', text)
		Backbone.history.navigate('#/todoItems', true)
		return false
	},

	delete: function(){
		this.collection.remove(this.model)
		Backbone.history.navigate('#/todoItems', true)
	},

	cancel: function(event){
		Backbone.history.navigate('#/todoItems', true)
	}
})

module.exports = ToDoItem
```

In the 'todo item' view, we are binding button clicks to our 'save', 'delete', and 'cancel' buttons. In these functions, we are updating our model and our collection. We're then routing back to the 'todo items' view using the convenient Backbone.history.navigate function.

Create the file public/templates/todo-item.hbs and add the following code to it.

```
<form>
  <div class="form-group">
    <label for="todo-item-text">Update todo item</label>
    <input type="text" class="form-control" id="todo-item-text" value="{{text}}">
  </div>
  <button type="submit" class="btn btn-default">Save</button>
	<button id="delete" type="button" class="btn btn-default">Delete</button>
	<button id="cancel" type="button" class="btn btn-default">Cancel</button>
</form>
```

Create the file public/routers/router.js and add the following code to it.

```
var Backbone = require('backbone')
var TodoItemsView = require('../views/todo-items')
var TodoItemView = require('../views/todo-item')

var Router = Backbone.Router.extend({
	routes: {
		'todoItems': 'todoItems',
		'todoItem/:id': 'todoItem',
		'*default': 'todoItems'
	},

	initialize: function(app){
		this.app = app
	},

	todoItems: function(){
		var view = new TodoItemsView({ collection: this.app.collection })
		this.showView(view)
	},

	todoItem: function(id){
		var todoItem = this.app.collection.get(id)
		var view = new TodoItemView({ collection: this.app.collection, model: todoItem })
		this.showView(view)
	},

	showView: function(view){
		var renderedView = view.render().el
		var $viewContainer = this.app.$('#main')
		$viewContainer.html(renderedView)
	}
})

module.exports = Router
```

We create the client-side router by defining the routes, and the functions they're bound to. The 'routes' property is an object, whose keys define the routes that a user navigates to in a browser, and whose values define the functions that will execute when a user navigates to those routes. For example, when a user navigates to '{our site}/todoItems' in a browser, the 'todoItems' function defined in our router will execute. Notice that it is up to us to actually show the view within the function. The colon notation used in the 'todoItem/:id' route allows for a variable value to be used within the URL, so a user could navigate to '/todoItem/1' to access the todo item with id of 1. Notice that this variable value gets passed to the route's function as an argument. Another thing to notice is that we are passing our collection and individual models to the views that need to access and change them.

Update the file public/views/app.js so that it looks like the following.

```
var Backbone = require('backbone')
var Router = require('../routers/router')
var TodoItemsCollection = require('../collections/todo-items')

var App = Backbone.View.extend({
	template: require('../templates/app.hbs'),

	initialize: function(){
		var TodoItemModel = require('../models/todo-item')
		var exampleTodoItems = [
			new TodoItemModel({ text: 'Take out the trash.' }),
			new TodoItemModel({ text: 'Walk the dog.' }),
			new TodoItemModel({ text: 'Pick up the kids from school.' })
		]
		this.collection = new TodoItemsCollection(exampleTodoItems)
	},

	render: function(options){
		this.setElement(this.template(options))
		this.router = new Router(this)
		Backbone.history.start()
		return this
	}
})

module.exports = App
```

Within our app view's initialize function, we are creating our collection to be used throughout the app. We are also adding a few todo items to it as examples. Within the render function, we are instantiating our client-side router, and then calling the function 'Backbone.history.start', which is how we start routing. We are passing our app view as an argument to the client-side router so that our client-side router has access to our collection and other resources it requires.

The main functionality of the app is now implemented. Try it out.

### Persistent State

Although our app is mostly functional, when we run it from one time to the next, our changes our lost. This is not very useful. Let's remedy this by adding a database.

We will add a database to the client, so the app works offline.

Then we will also add a database to the server, so todo items can be saved to the cloud, and synced from multiple devices. We will use our REST API to communicate with this database.

### Client Database

For our client database, we will be using [Loki](http://lokijs.org/#/). Loki is a fast, in-memory database that, most importantly for our convenience, will allow us to read and write our data with JavaScript, not SQL, and the data is stored in [JSON](http://json.org/) format. Our client is running in a browser, which has no file system access, so we will be persisting the database to [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API). If we were creating a mobile app with a framework such as [Cordova](https://cordova.apache.org/), we might choose to persist our database to a JSON file.

Before we begin adding code, let's go over a few things that we will need to know.

Remember, we are storing our data using Backbone models and collections. In order to save these to our Loki database, we have to do a little work. Luckily, Backbone helps us out some. Backbone provides a 'sync' function for CRUD operations as part of its framework, that can be [overridden](https://en.wikipedia.org/wiki/Method_overriding) in order to provide customized functionality, which we are going to do. By default, the sync function attempts to make RESTful requests to a server. The functionality that we are going to provide instead is having our Backbone models and collections sync with our Loki database each time they are modified. Note that we don't call sync directly. It is called internally by other Backbone functions that we do call, such as ['collection.create'](http://backbonejs.org/#Collection-create).

Add Loki as a dependency by running the following command in the command line.

```
npm i lokijs --save
```

Update server.js to have the Loki files served to the browser.

```
var express = require('express')

var app = express()

app.use('/', express.static('./public'))
app.use('/js', express.static('./node_modules/bootstrap/dist/js'))
app.use('/js', express.static('./node_modules/jquery/dist'))
app.use('/js', express.static('./node_modules/lokijs/src'))
app.use('/css', express.static('./node_modules/bootstrap/dist/css'))

app.listen(4321, function(){
  console.log('Todo App is listening on port 4321!')
})
```

Update index.html to add a link to Loki.

```
<html>
	<head>
		<title>Node Web App Guide</title>
		<link rel="stylesheet" href="css/bootstrap.css" />
		<script src="js/jquery.js"></script>
		<script src="js/bootstrap.js"></script>
		<script src="js/lokijs.js"></script>
	</head>
	<body>
		<script src="bundle.js"></script>
	</body>
</html>
```

Update index.js to load our database into memory on page load.

```
var App = require('./views/app')
// because index.html has a link to lokijs.js, loki is a global variable in the browser

var db = new loki('todo.db', {
  autoload: true,
  autoloadCallback : autoloadCallback,
  autosave: true,
  autosaveInterval: 1000 // autosave every second
})

function autoloadCallback(){
    window.db = db
    renderApp()
}

function renderApp(){
  var app = new App()
  $(document.body).html(app.render({ appName: 'Todo App' }).el)
}
```

Create the file library/backbone-loki-sync.js and add the following code.

```
// window.db set in index.js
var getOrCreateLokiCollection = function(model){
	var collectionName = model.collection ? model.collection.name : model.name
	var collection = db.getCollection(collectionName) || db.addCollection(collectionName)
	return collection
}

var sync = function(method, model, options){
	if(method === 'create'){
		var lokiCollection = getOrCreateLokiCollection(model)
		var doc = lokiCollection.insert(model.toJSON())
		if(options.success) options.success(doc)
	}
	if(method === 'read'){
		var lokiCollection = getOrCreateLokiCollection(model)
		if(model.lokiCollection){ // if model
			var doc = lokiCollection.get(model.id)
			if(options.success) options.success(doc)
		} else { // if collection
      var docs = lokiCollection.data
      if(options.success) options.success(docs)
		}
	}
	if(method === 'update'){
		var lokiCollection = getOrCreateLokiCollection(model)
		var doc = lokiCollection.update(model.toJSON())
		if(options.success) options.success(doc)
	}
	if(method === 'delete'){
		var lokiCollection = getOrCreateLokiCollection(model)
		console.log('id: ' + model.get('$loki'))
		var doc = lokiCollection.remove(model.toJSON())
		if(options.success) options.success(doc)
	}
}

module.exports = sync
```

A few things to note in this file are as follows. The 'db' variable is a global variable, referencing our Loki database, that we set in index.js. The sync function takes three arguments. If it is not clear to you how these are used, consult the Backbone documentation. Everything else should be fairly straight-forward. After looking at the file, you should notice that it is simply mapping Backbone's CRUD operations to those of Loki. It also invokes a callback function, if one was provided.

Update public/models/todo-item.js to use our sync module.

```
var Backbone = require('backbone')

var TodoItem = Backbone.Model.extend({
	idAttribute: '$loki',

	defaults: {
		text: 'New todo item.'
	},

	sync: require('../library/backbone-loki-sync')
})

module.exports = TodoItem
```

Of not in this file is 'idAttribute' with a value of '$loki'. Objects within a Loki database are automatically given a '$loki' attribute with a unique id as a value. We are telling Backbone to use this Loki attribute as the unique id of Backbone objects that are created.

Update public/collections/todo-items.js to use our sync module.

```
var Backbone = require('backbone')

var TodoItems = Backbone.Collection.extend({
	name: 'todoItems',

	model: require('../models/todo-item'),

	sync: require('../library/backbone-loki-sync')
})

module.exports = TodoItems
```

Update public/templates/list-item.hbs to take into account that '$loki' is the id attribute.

```
<a href="/#/todoItem/{{$loki}}">
	<li class="list-group-item">{{text}}</li>
</a>
```

Update public/views/app.js to fetch existing todo items from the database on load.

```
var Backbone = require('backbone')
var Router = require('../routers/router')
var TodoItemsCollection = require('../collections/todo-items')

var App = Backbone.View.extend({
	template: require('../templates/app.hbs'),

	initialize: function(){
		this.collection = new TodoItemsCollection()
		this.collection.fetch()
	},

	render: function(options){
		this.setElement(this.template(options))
		this.router = new Router(this)
		Backbone.history.start()
		return this
	}
})

module.exports = App
```

Update public/views/todo-item.js so that it uses Backbone function(s) that internally use our 'sync' function, so that changes are persisted to disk.

```
var Backbone = require('backbone')

var ToDoItem = Backbone.View.extend({
	template: require('../templates/todo-item.hbs'),

	events: {
		'submit': 'save',
		'click #delete': 'delete',
		'click #cancel': 'cancel'
	},

	render: function(){
		this.setElement(this.template(this.model.toJSON()))
		return this
	},

	save: function(){
		var text = this.$('#todo-item-text').val()
		this.model.set('text', text)
		this.model.save()
		Backbone.history.navigate('#/todoItems', true)
		return false
	},

	delete: function(){
		this.model.destroy()
		Backbone.history.navigate('#/todoItems', true)
	},

	cancel: function(event){
		Backbone.history.navigate('#/todoItems', true)
	}
})

module.exports = ToDoItem
```

Update public/views/todo-items.js so that it uses Backbone function(s) that internally use our 'sync' function, so that changes are persisted to disk.

```
var Backbone = require('backbone')
var listItemTemplate = require('../templates/list-item.hbs')
var TodoItemModel = require('../models/todo-item')

var ToDoItems = Backbone.View.extend({
	template: require('../templates/todo-items.hbs'),

	events: {
		'click #add': 'add'
	},

	initialize: function(){
		this.collection.on('update', this.renderListItems.bind(this))
	},

	render: function(){
		this.setElement(this.template())
		this.renderListItems()
		return this
	},

	renderListItems: function(){
		var $listGroup = this.$('.list-group')
		$listGroup.html('')
		this.collection.forEach(function(todoItem){
			var renderedListItem = listItemTemplate(todoItem.toJSON())
			$listGroup.append(renderedListItem)
		})
	},

	add: function(){
		var todoItem = new TodoItemModel
		this.collection.create(todoItem)
	}
})

module.exports = ToDoItems
```

Update public/routers/router.js. We no longer need to pass the Backbone collection to the 'todo-item' view.

```
var Backbone = require('backbone')
var TodoItemsView = require('../views/todo-items')
var TodoItemView = require('../views/todo-item')

var Router = Backbone.Router.extend({
	routes: {
		'todoItems': 'todoItems',
		'todoItem/:id': 'todoItem',
		'*default': 'todoItems'
	},

	initialize: function(app){
		this.app = app
	},

	todoItems: function(){
		var view = new TodoItemsView({ collection: this.app.collection })
		this.showView(view)
	},

	todoItem: function(id){
		var todoItem = this.app.collection.get(id)
		var view = new TodoItemView({ model: todoItem })
		this.showView(view)
	},

	showView: function(view){
		var renderedView = view.render().el
		var $viewContainer = this.app.$('#main')
		$viewContainer.html(renderedView)
	}
})

module.exports = Router
```

After making the above changes, it should now be possible to create todo items within our app, and have them persist across page loads. Try it out.

### Server Database

For our server database, we will also be using Loki. The only difference from the frontend is that we will be persisting the database to a JSON file. Besides Loki, there are many other database options. We are using Loki here to limit the number of subjects covered in this guide. Some other popular server databases include [MySQL](https://www.mysql.com/) and [SQLite](https://sqlite.org/).

Remember that we overrode the 'sync' function of the 'todo-item' model and the 'todo-items' collection. This was so that we could have our database stored locally, instead of being sent to a server, which is the default behavior. But now we do want the option of sending our data to our server. There are various ways we could achieve this. For example, we could write functions for each of the CRUD operations, each of which would send the appropriate HTTP request to the server. But a simpler route is to take advantage of the default functionality of the sync function.

Create the file public/library/backbone-server-sync.js and add the following code to it.

```
var Backbone = require('backbone')

var syncWithServer = function(method, collection){
	var syncFunction = function(callback){
		var options = {
			success: callback
		}
		Backbone.sync(method, collection, options)
	}

	return syncFunction
}

module.exports = syncWithServer
```

The 'syncWithServer' function returns a function that behaves differently based on whether we'd like it to send data to the server or retrieve data from the server. It uses the default 'Backbone.Collection.sync' function to do so. Continue reading and this should become clearer.

Update the public/collections/todo-items.js file as follows.

```
var Backbone = require('backbone')
var syncWithServer = require('../library/backbone-server-sync')

var TodoItems = Backbone.Collection.extend({
	name: 'todoItems',

	model: require('../models/todo-item'),

	sync: require('../library/backbone-loki-sync'),

	url: '/todoItems',

	initialize: function(){
		this.syncToServer = syncWithServer('create', this),

		this.syncFromServer = syncWithServer('read', this)
	}
})

module.exports = TodoItems
```

Note that we added two functions, 'syncToServer' and 'syncFromServer' that make use of our 'syncWithServer' function. When we are done, will simply be able to call 'syncToServer' or 'syncFromServer' to sync our client database with our server database. We are assigning these functions inside the 'initialize' function, so that we have access to 'this'.

We have a few more things to do. We need to add buttons to the user interface for syncing. We also need to add routes to the server, aka our REST API, for handling the syncing. Let's create the REST API first.

The REST API will save data to our server database, so we need to set that up first.

Update server.js as follows.

```
var express = require('express')
var loki = require('lokijs')

var db = new loki('data/todo.json', {
  autoload: true,
  autoloadCallback : autoloadCallback,
  autosave: true,
  autosaveInterval: 1000
})

var app = express()

function autoloadCallback(){
	app.use('/', express.static('./public'))
	app.use('/js', express.static('./node_modules/bootstrap/dist/js'))
	app.use('/js', express.static('./node_modules/jquery/dist'))
	app.use('/js', express.static('./node_modules/lokijs/src'))
	app.use('/css', express.static('./node_modules/bootstrap/dist/css'))

	app.listen(4321, function(){
	  console.log('Todo App is listening on port 4321!')
	})
}
```

You can see that the server database setup is basically the same that of the client database.

Create the file routes/todo-items.js and add the following code.

```
var Backbone = require('backbone')
var Express = require('express')
var TodoItems = require('../public/collections/todo-items')

var todoItems = function(){
	var router = Express.Router()

	router.get('/', function(req, res, next){
		var todoItems = new TodoItems
		todoItems.fetch()
		todoItems = todoItems.toJSON()

		// extract only the 'text' property of each todo item object
		todoItems = todoItems.map(function(todoItem){
			return { text: todoItem.text }
		})

		res.json(todoItems)
	})

	router.post('/', function(req, res, next){
		var todoItems = new TodoItems
		todoItems.fetch()

		// destroy all existing todo items in database
		var todoItemsArray = todoItems.toArray()
		for(var i = 0; i < todoItemsArray.length; i++){
			todoItemsArray[i].destroy()
		}

		// extract only the 'text' property of each todo item object
		req.body = req.body.map(function(todoItem){
			return { text: todoItem.text }
		})

		// add all todo items to database
		req.body.forEach(function(todoItem){
			todoItems.create(todoItem)
		})

		res.sendStatus(200)
	})

	return router
}

module.exports = todoItems
```

In this file we created an Express router, not to be confused with a Backbone router. Our router defines a 'get' endpoint, for retrieving our database from our server, and a 'post' endpoint, for sending our database to our server. The 'req' and 'res' arguments mean 'request' and 'response', respectively. If their meaning is not clear, consult the Express documentation. The 'next' function is a callback that allows middleware, aka intermediate software, to be chained together, so that different operations can be performed on the request and the response. You will see in a little while how this router fits into our app.

For now, notice that we are simply interacting with our database as we did from the client, via Backbone. This is because the overridden 'sync' function on our model and collection work here as well as on the client.

You'll notice that we are making use of the 'req.body' property. This property is not part of Express. We are going to be using the ['body-parser'](https://www.npmjs.com/package/body-parser) middleware, to add this property for us. This module simply attaches a 'body' object to the 'req' objects that our routes receive, which contains our data. Otherwise we would have to parse the bodies of requests ourselves.

Next we need to modify server.js slightly to make use of our routes.

Update server.js as follows.

```
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
```

The last thing we need to do is wire up a few buttons to make use of our REST API, 'Sync To Server' and 'Sync From Server'.

Update public/templates/todo-items.hbs as follows.

```
<div>
	<div class="panel panel-default">
	  <div class="panel-body">
			<form>
				<button id="sync-to-server" type="button" class="btn btn-default pull-left">Sync To Server</button>
				<button id="sync-from-server" type="button" class="btn btn-default pull-left">Sync From Server</button>
				<button id="add" type="button" class="btn btn-default pull-right">+</button>
			</form>
	  </div>
	</div>
	<ul class="list-group">
	</ul>
</div>
```

Update public/views/todo-items.js as follows.

```
var Backbone = require('backbone')
var listItemTemplate = require('../templates/list-item.hbs')
var TodoItemModel = require('../models/todo-item')

var ToDoItems = Backbone.View.extend({
	template: require('../templates/todo-items.hbs'),

	events: {
		'click #add': 'add',
		'click #sync-to-server': 'syncToServer',
		'click #sync-from-server': 'syncFromServer'
	},

	initialize: function(){
		this.collection.on('update', this.renderListItems.bind(this))
	},

	render: function(){
		this.setElement(this.template())
		this.renderListItems()
		return this
	},

	renderListItems: function(){
		var $listGroup = this.$('.list-group')
		$listGroup.html('')
		this.collection.forEach(function(todoItem){
			var renderedListItem = listItemTemplate(todoItem.toJSON())
			$listGroup.append(renderedListItem)
		})
	},

	add: function(){
		var todoItem = new TodoItemModel
		this.collection.create(todoItem)
	},

	syncToServer: function(){
		this.collection.syncToServer()
	},

	syncFromServer: function(){
		// destroy all existing todo items in database
		var todoItemsArray = this.collection.toArray()
		for(var i = 0; i < todoItemsArray.length; i++){
			todoItemsArray[i].destroy()
		}

		// add all
		var self = this
		this.collection.syncFromServer(function(collection){
			self.collection.reset()
			collection.forEach(function(todoItem){
				self.collection.create(todoItem)
			})
		})
	}
})

module.exports = ToDoItems
```

You should now be able to sync to and from the server. Try it out.

Our node web app is now complete.
