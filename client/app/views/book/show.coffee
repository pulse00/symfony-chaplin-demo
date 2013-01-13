View = require 'views/base/view'
module.exports = class BookShowView extends View

	template: require 'views/templates/book/show'
	container: '#page-container'
	
	initialize: (options) ->
		super(options)
		@listenTo @model, 'change', @render