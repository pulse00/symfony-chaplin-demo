Controller = require 'controllers/base/controller'
BookListView = require 'views/book/list'
BookView = require 'views/book/show'
Books = require 'models/books'
Book = require 'models/book'
module.exports = class BooksController extends Controller

  list: ->
    @books = new Books
    @view = new BookListView collection: @books
    @books.fetch()

  show: (params) ->

    $payload = $('#payload')
    @book = if $payload.length then new Book $payload.data('object') else new Book id: params.id
    @view = new BookView model: @book

    if $payload.length
      @book.trigger 'change'
      $payload.remove()
    else
    	@book.fetch()

      