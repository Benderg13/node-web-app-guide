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
