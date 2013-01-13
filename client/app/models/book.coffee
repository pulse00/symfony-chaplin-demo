mediator = require 'mediator'
Model = require 'models/base/model'

module.exports = class Book extends Model

  url: =>
    url = mediator.symfonyRouter.generate 'get_book', { 'id' : @id }
    return url