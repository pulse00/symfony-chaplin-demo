String::beginsWith = (str) -> if @match(new RegExp "^#{str}") then true else false
String::endsWith = (str) -> if @match(new RegExp "#{str}$") then true else false

Application = require 'application'

# Initialize the application on DOM ready event.
$ ->
  app = new Application()
  app.initialize()
