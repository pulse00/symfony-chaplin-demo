mediator = require 'mediator'
View = require 'views/base/view'
template = require 'views/templates/auth/login'

module.exports = class LoginView extends View

  $modal = null

  initialize: (options) ->
    super(options)
    @$modal = $('#modal-view')

  render: ->

    url = mediator.symfonyRouter.generate('fos_user_security_login')    

    $.get url, (response) =>
      @$modal.html(response).modal()
      .on 'shown',  (event) => @bindForm(@$modal.find('form'))
      .on 'hidden', (event) => @publishEvent 'loginClosed'

  bindForm: ($form) ->

    $form.on 'submit', (event) =>
      $.post $form.attr('action'), $form.serialize(), (response) =>
          # authentication success
          if typeof(response) == 'object'
            mediator.user = response
            @publishEvent 'loginSuccess', response
            @$modal.modal('hide')
          # rebind the form with validation errors
          else
            @bindForm(@$modal.html(response).find('form'))
      return false