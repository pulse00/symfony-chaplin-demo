Book = require 'models/book'

describe 'Book', ->
  beforeEach ->
    @model = new Book()
