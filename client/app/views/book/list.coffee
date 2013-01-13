View = require 'views/base/collection-view'

module.exports = class BookListView extends View

  template: require 'views/templates/book/list'
  itemView: require 'views/book/list_item'

  container: '#page-container'
  listSelector: '.bookList'


