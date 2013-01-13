Book = require 'controllers/book-controller'

describe 'Book', ->
  beforeEach ->
    @controller = new Book()
