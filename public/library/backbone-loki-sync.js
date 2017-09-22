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
		var doc = lokiCollection.remove(model.toJSON())
		if(options.success) options.success(doc)
	}
}

module.exports = sync
