View = require 'views/base/view'
template = require 'views/templates/book/list_item'

module.exports = class BookListItemView extends View
  
  template: require 'views/templates/book/list_item'
  tagName: 'li'
  className: 'bookTeaser'