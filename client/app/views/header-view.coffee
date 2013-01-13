mediator = require 'mediator'
View = require 'views/base/view'
LoginView = require 'views/auth/login-view'
template = require 'views/templates/header'

module.exports = class HeaderView extends View

  autoRender: yes
  className: 'header'
  container: '#header-container'
  id: 'header'

  loginView: null

  template: template

  initialize: (options) ->
    super(options)
    @delegate 'click', '.login',  @doLogin
    @subscribeEvent 'loginClosed', (event) =>
      @loginView = null

    @subscribeEvent 'loginSuccess', @render
    @subscribeEvent 'logout', @render

  doLogin: (event) ->
    return false unless not @loginView?
    @loginView = new LoginView()
    @loginView.render()
    return false