Collection = require 'models/base/collection'
Books = require 'models/books'
Books = require 'models/books'

describe 'Books', ->
  beforeEach ->
    @model = new Books()
    @collection = new Books()

  afterEach ->
    @model.dispose()
    @collection.dispose()
