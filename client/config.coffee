exports.config =
  paths:
    public: './../web'  
  files:
    javascripts:
      joinTo:
        'js/app.js': /^app/
        'js/vendor.js': /^vendor/
        'test/js/test.js': /^test(\/|\\)(?!vendor)/
        'test/js/test-vendor.js': /^test(\/|\\)(?=vendor)/
      order:
        # Files in `vendor` directories are compiled before other files
        # even if they aren't specified in order.before.
        before: [
          'vendor/scripts/console-helper.js',
          'vendor/scripts/jquery-1.8.3.js',
          'vendor/scripts/underscore-1.4.3.js',
          'vendor/scripts/backbone-0.9.9.js'
          'vendor/scripts/bootstrap.js'
        ]
        after: [
          'test/vendor/scripts/test-helper.js'
        ]

    stylesheets:
      joinTo:
        'css/app.css': /^(vendor|app)/
        'test/css/test.css': /^test/
      order:
        before: ['vendor/styles/bootstrap.css']
        after: [
            'vendor/styles/helpers.css'
        ]

    templates:
      joinTo: 'js/app.js'
