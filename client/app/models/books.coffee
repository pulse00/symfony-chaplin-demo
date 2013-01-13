mediator = require 'mediator'
Collection = require 'models/base/collection'
Book = require 'models/book'

module.exports = class Books extends Collection

  url: mediator.symfonyRouter.generate('get_books')
  model: Book