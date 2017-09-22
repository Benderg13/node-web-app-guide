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
