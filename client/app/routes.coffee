mediator = require 'mediator'

module.exports = (match) ->

  match route('home'),			'home#index',	name: 'home'
  match route('books_list'),	'book#list',	name: 'books_list'
  match route('books_show'),	'book#show',	name: 'books_show'

route = (param) ->
	mediator.symfonyRouter.generateMatch(param)