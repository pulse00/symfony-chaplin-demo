(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

window.require.register("application", function(exports, require, module) {
  var Application, Chaplin, HeaderController, Layout, SymfonyRouter, mediator, routes,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  HeaderController = require('controllers/header-controller');

  Layout = require('views/layout');

  mediator = require('mediator');

  routes = require('routes');

  SymfonyRouter = require('symfony_router');

  module.exports = Application = (function(_super) {

    __extends(Application, _super);

    function Application() {
      return Application.__super__.constructor.apply(this, arguments);
    }

    Application.prototype.title = 'bookstore demo application';

    Application.prototype.initialize = function() {
      Application.__super__.initialize.apply(this, arguments);
      this.initDispatcher({
        controllerSuffix: '-controller'
      });
      this.initLayout();
      this.initMediator();
      this.initRouter(routes);
      this.initControllers();
      return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
    };

    Application.prototype.initLayout = function() {
      return this.layout = new Layout({
        title: this.title
      });
    };

    Application.prototype.initControllers = function() {
      return new HeaderController();
    };

    Application.prototype.initMediator = function() {
      mediator.user = null;
      mediator.symfonyRouter = new SymfonyRouter();
      return mediator.seal();
    };

    return Application;

  })(Chaplin.Application);
  
});
window.require.register("controllers/base/controller", function(exports, require, module) {
  var Chaplin, Controller,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Controller = (function(_super) {

    __extends(Controller, _super);

    function Controller() {
      return Controller.__super__.constructor.apply(this, arguments);
    }

    return Controller;

  })(Chaplin.Controller);
  
});
window.require.register("controllers/book-controller", function(exports, require, module) {
  var Book, BookListView, BookView, Books, BooksController, Controller,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  BookListView = require('views/book/list');

  BookView = require('views/book/show');

  Books = require('models/books');

  Book = require('models/book');

  module.exports = BooksController = (function(_super) {

    __extends(BooksController, _super);

    function BooksController() {
      return BooksController.__super__.constructor.apply(this, arguments);
    }

    BooksController.prototype.list = function() {
      this.books = new Books;
      this.view = new BookListView({
        collection: this.books
      });
      return this.books.fetch();
    };

    BooksController.prototype.show = function(params) {
      var $payload;
      $payload = $('#payload');
      this.book = $payload.length ? new Book($payload.data('object')) : new Book({
        id: params.id
      });
      this.view = new BookView({
        model: this.book
      });
      if ($payload.length) {
        this.book.trigger('change');
        return $payload.remove();
      } else {
        return this.book.fetch();
      }
    };

    return BooksController;

  })(Controller);
  
});
window.require.register("controllers/header-controller", function(exports, require, module) {
  var Controller, HeaderController, HeaderView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  HeaderView = require('views/header-view');

  module.exports = HeaderController = (function(_super) {

    __extends(HeaderController, _super);

    function HeaderController() {
      return HeaderController.__super__.constructor.apply(this, arguments);
    }

    HeaderController.prototype.initialize = function() {
      HeaderController.__super__.initialize.apply(this, arguments);
      return this.view = new HeaderView();
    };

    return HeaderController;

  })(Controller);
  
});
window.require.register("controllers/home-controller", function(exports, require, module) {
  var Controller, HomeController, HomePageView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  HomePageView = require('views/home-page-view');

  module.exports = HomeController = (function(_super) {

    __extends(HomeController, _super);

    function HomeController() {
      return HomeController.__super__.constructor.apply(this, arguments);
    }

    HomeController.prototype.index = function() {
      return this.view = new HomePageView();
    };

    return HomeController;

  })(Controller);
  
});
window.require.register("initialize", function(exports, require, module) {
  var Application;

  String.prototype.beginsWith = function(str) {
    if (this.match(new RegExp("^" + str))) {
      return true;
    } else {
      return false;
    }
  };

  String.prototype.endsWith = function(str) {
    if (this.match(new RegExp("" + str + "$"))) {
      return true;
    } else {
      return false;
    }
  };

  Application = require('application');

  $(function() {
    var app;
    app = new Application();
    return app.initialize();
  });
  
});
window.require.register("lib/support", function(exports, require, module) {
  var Chaplin, support, utils;

  Chaplin = require('chaplin');

  utils = require('lib/utils');

  support = utils.beget(Chaplin.support);

  module.exports = support;
  
});
window.require.register("lib/utils", function(exports, require, module) {
  var Chaplin, utils;

  Chaplin = require('chaplin');

  utils = Chaplin.utils.beget(Chaplin.utils);

  module.exports = utils;
  
});
window.require.register("lib/view-helper", function(exports, require, module) {
  var mediator,
    __slice = [].slice;

  mediator = require('mediator');

  Handlebars.registerHelper('if_logged_in', function(options) {
    if (mediator.user) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  Handlebars.registerHelper('with', function(context, options) {
    if (!context || Handlebars.Utils.isEmpty(context)) {
      return options.inverse(this);
    } else {
      return options.fn(context);
    }
  });

  Handlebars.registerHelper('with_user', function(options) {
    var context;
    context = mediator.user || {};
    return Handlebars.helpers["with"].call(this, context, options);
  });

  Handlebars.registerHelper('without', function(context, options) {
    var inverse;
    inverse = options.inverse;
    options.inverse = options.fn;
    options.fn = inverse;
    return Handlebars.helpers["with"].call(this, context, options);
  });

  Handlebars.registerHelper('url', function() {
    var params, routeName, url;
    routeName = arguments[0], params = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    url = null;
    mediator.publish('!router:reverse', routeName, params, function(result) {
      return url = result;
    });
    return "/" + url;
  });
  
});
window.require.register("mediator", function(exports, require, module) {
  
  module.exports = require('chaplin').mediator;
  
});
window.require.register("models/base/collection", function(exports, require, module) {
  var Chaplin, Collection, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  Model = require('models/base/model');

  module.exports = Collection = (function(_super) {

    __extends(Collection, _super);

    function Collection() {
      return Collection.__super__.constructor.apply(this, arguments);
    }

    Collection.prototype.model = Model;

    return Collection;

  })(Chaplin.Collection);
  
});
window.require.register("models/base/model", function(exports, require, module) {
  var Chaplin, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Model = (function(_super) {

    __extends(Model, _super);

    function Model() {
      return Model.__super__.constructor.apply(this, arguments);
    }

    return Model;

  })(Chaplin.Model);
  
});
window.require.register("models/book", function(exports, require, module) {
  var Book, Model, mediator,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  mediator = require('mediator');

  Model = require('models/base/model');

  module.exports = Book = (function(_super) {

    __extends(Book, _super);

    function Book() {
      this.url = __bind(this.url, this);
      return Book.__super__.constructor.apply(this, arguments);
    }

    Book.prototype.url = function() {
      var url;
      url = mediator.symfonyRouter.generate('get_book', {
        'id': this.id
      });
      return url;
    };

    return Book;

  })(Model);
  
});
window.require.register("models/books", function(exports, require, module) {
  var Book, Books, Collection, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  mediator = require('mediator');

  Collection = require('models/base/collection');

  Book = require('models/book');

  module.exports = Books = (function(_super) {

    __extends(Books, _super);

    function Books() {
      return Books.__super__.constructor.apply(this, arguments);
    }

    Books.prototype.url = mediator.symfonyRouter.generate('get_books');

    Books.prototype.model = Book;

    return Books;

  })(Collection);
  
});
window.require.register("routes", function(exports, require, module) {
  var mediator, route;

  mediator = require('mediator');

  module.exports = function(match) {
    match(route('home'), 'home#index', {
      name: 'home'
    });
    match(route('books_list'), 'book#list', {
      name: 'books_list'
    });
    return match(route('books_show'), 'book#show', {
      name: 'books_show'
    });
  };

  route = function(param) {
    return mediator.symfonyRouter.generateMatch(param);
  };
  
});
window.require.register("symfony_router", function(exports, require, module) {
  var SymfonyRouter, mediator,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  mediator = require('mediator');

  module.exports = SymfonyRouter = (function() {

    function SymfonyRouter() {
      this.generate = __bind(this.generate, this);

    }

    SymfonyRouter.prototype.generateMatch = function(routename) {
      var param, params, route, token, url, _i, _j, _len, _len1, _ref;
      route = Routing.getRoute(routename);
      url = '';
      params = [];
      _ref = route.tokens;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        token = _ref[_i];
        if (token[0] === 'text') {
          url = token[1].slice(1);
          continue;
        }
        if (token[0] === 'variable' && token[1] !== '.') {
          params.push(token[3]);
        }
      }
      for (_j = 0, _len1 = params.length; _j < _len1; _j++) {
        param = params[_j];
        url += '/:' + param;
      }
      url = Routing.getBaseUrl() + '/' + url;
      if (url.endsWith('/')) {
        url = url.substr(0, url.length - 1);
      }
      if (url.beginsWith('/')) {
        url = url.replace('/', '');
      }
      return url;
    };

    SymfonyRouter.prototype.generate = function(name, params) {
      var url;
      url = Routing.generate(name, params);
      if (url.endsWith('/')) {
        url = url.substr(0, url.length - 1);
      }
      return url;
    };

    return SymfonyRouter;

  })();
  
});
window.require.register("views/auth/login-view", function(exports, require, module) {
  var LoginView, View, mediator, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  mediator = require('mediator');

  View = require('views/base/view');

  template = require('views/templates/auth/login');

  module.exports = LoginView = (function(_super) {
    var $modal;

    __extends(LoginView, _super);

    function LoginView() {
      return LoginView.__super__.constructor.apply(this, arguments);
    }

    $modal = null;

    LoginView.prototype.initialize = function(options) {
      LoginView.__super__.initialize.call(this, options);
      return this.$modal = $('#modal-view');
    };

    LoginView.prototype.render = function() {
      var url,
        _this = this;
      url = mediator.symfonyRouter.generate('fos_user_security_login');
      return $.get(url, function(response) {
        return _this.$modal.html(response).modal().on('shown', function(event) {
          return _this.bindForm(_this.$modal.find('form')).on('hidden', function(event) {
            return _this.publishEvent('loginClosed');
          });
        });
      });
    };

    LoginView.prototype.bindForm = function($form) {
      var _this = this;
      return $form.on('submit', function(event) {
        $.post($form.attr('action'), $form.serialize(), function(response) {
          if (typeof response === 'object') {
            mediator.user = response;
            _this.publishEvent('loginSuccess', response);
            return _this.$modal.modal('hide');
          } else {
            return _this.bindForm(_this.$modal.html(response).find('form'));
          }
        });
        return false;
      });
    };

    return LoginView;

  })(View);
  
});
window.require.register("views/base/collection-view", function(exports, require, module) {
  var Chaplin, CollectionView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  View = require('views/base/view');

  module.exports = CollectionView = (function(_super) {

    __extends(CollectionView, _super);

    function CollectionView() {
      return CollectionView.__super__.constructor.apply(this, arguments);
    }

    CollectionView.prototype.getTemplateFunction = View.prototype.getTemplateFunction;

    CollectionView.prototype.animationDuration = 0;

    return CollectionView;

  })(Chaplin.CollectionView);
  
});
window.require.register("views/base/view", function(exports, require, module) {
  var Chaplin, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  require('lib/view-helper');

  module.exports = View = (function(_super) {

    __extends(View, _super);

    function View() {
      return View.__super__.constructor.apply(this, arguments);
    }

    View.prototype.getTemplateFunction = function() {
      return this.template;
    };

    return View;

  })(Chaplin.View);
  
});
window.require.register("views/book/list", function(exports, require, module) {
  var BookListView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/collection-view');

  module.exports = BookListView = (function(_super) {

    __extends(BookListView, _super);

    function BookListView() {
      return BookListView.__super__.constructor.apply(this, arguments);
    }

    BookListView.prototype.template = require('views/templates/book/list');

    BookListView.prototype.itemView = require('views/book/list_item');

    BookListView.prototype.container = '#page-container';

    BookListView.prototype.listSelector = '.bookList';

    return BookListView;

  })(View);
  
});
window.require.register("views/book/list_item", function(exports, require, module) {
  var BookListItemView, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/book/list_item');

  module.exports = BookListItemView = (function(_super) {

    __extends(BookListItemView, _super);

    function BookListItemView() {
      return BookListItemView.__super__.constructor.apply(this, arguments);
    }

    BookListItemView.prototype.template = require('views/templates/book/list_item');

    BookListItemView.prototype.tagName = 'li';

    BookListItemView.prototype.className = 'bookTeaser';

    return BookListItemView;

  })(View);
  
});
window.require.register("views/book/show", function(exports, require, module) {
  var BookShowView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  module.exports = BookShowView = (function(_super) {

    __extends(BookShowView, _super);

    function BookShowView() {
      return BookShowView.__super__.constructor.apply(this, arguments);
    }

    BookShowView.prototype.template = require('views/templates/book/show');

    BookShowView.prototype.container = '#page-container';

    BookShowView.prototype.initialize = function(options) {
      BookShowView.__super__.initialize.call(this, options);
      return this.listenTo(this.model, 'change', this.render);
    };

    return BookShowView;

  })(View);
  
});
window.require.register("views/header-view", function(exports, require, module) {
  var HeaderView, LoginView, View, mediator, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  mediator = require('mediator');

  View = require('views/base/view');

  LoginView = require('views/auth/login-view');

  template = require('views/templates/header');

  module.exports = HeaderView = (function(_super) {

    __extends(HeaderView, _super);

    function HeaderView() {
      return HeaderView.__super__.constructor.apply(this, arguments);
    }

    HeaderView.prototype.autoRender = true;

    HeaderView.prototype.className = 'header';

    HeaderView.prototype.container = '#header-container';

    HeaderView.prototype.id = 'header';

    HeaderView.prototype.loginView = null;

    HeaderView.prototype.template = template;

    HeaderView.prototype.initialize = function(options) {
      var _this = this;
      HeaderView.__super__.initialize.call(this, options);
      this.delegate('click', '.login', this.doLogin);
      this.subscribeEvent('loginClosed', function(event) {
        return _this.loginView = null;
      });
      this.subscribeEvent('loginSuccess', this.render);
      return this.subscribeEvent('logout', this.render);
    };

    HeaderView.prototype.doLogin = function(event) {
      if (!!(this.loginView != null)) {
        return false;
      }
      this.loginView = new LoginView();
      this.loginView.render();
      return false;
    };

    return HeaderView;

  })(View);
  
});
window.require.register("views/home-page-view", function(exports, require, module) {
  var HomePageView, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/home');

  View = require('views/base/view');

  module.exports = HomePageView = (function(_super) {

    __extends(HomePageView, _super);

    function HomePageView() {
      return HomePageView.__super__.constructor.apply(this, arguments);
    }

    HomePageView.prototype.autoRender = true;

    HomePageView.prototype.className = 'home-page';

    HomePageView.prototype.container = '#page-container';

    HomePageView.prototype.template = template;

    return HomePageView;

  })(View);
  
});
window.require.register("views/layout", function(exports, require, module) {
  var Chaplin, Layout,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Layout = (function(_super) {

    __extends(Layout, _super);

    function Layout() {
      return Layout.__super__.constructor.apply(this, arguments);
    }

    return Layout;

  })(Chaplin.Layout);
  
});
window.require.register("views/templates/auth/login", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "";


    return buffer;});
});
window.require.register("views/templates/book/list", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<h1>Available books</h1>\n<ul class=\"bookList\"></ul>";});
});
window.require.register("views/templates/book/list_item", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";


    buffer += "<a href='";
    stack1 = depth0.id;
    foundHelper = helpers.url;
    stack1 = foundHelper ? foundHelper.call(depth0, "books_show", stack1, {hash:{}}) : helperMissing.call(depth0, "url", "books_show", stack1, {hash:{}});
    buffer += escapeExpression(stack1) + "'>\n	";
    foundHelper = helpers.title;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "\n</a>\n\n";
    return buffer;});
});
window.require.register("views/templates/book/show", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


    buffer += "<h1>";
    foundHelper = helpers.title;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + " <span class=\"small\">(";
    foundHelper = helpers.id;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + ")<span></h1>\n<p>";
    foundHelper = helpers.description;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "</p>";
    return buffer;});
});
window.require.register("views/templates/header", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing, helperMissing=helpers.helperMissing;

  function program1(depth0,data) {
    
    var buffer = "", stack1, foundHelper;
    buffer += "\n              ";
    foundHelper = helpers.with_user;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)}); }
    else { stack1 = depth0.with_user; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    if (!helpers.with_user) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)}); }
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n            ";
    return buffer;}
  function program2(depth0,data) {
    
    var buffer = "", stack1, foundHelper;
    buffer += "\n                <li><span style=\"color: #fff;\">Logged in as ";
    foundHelper = helpers.username;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.username; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "</span></li>\n                <li><a href=\"#\" class=\"logout\">Logout</a></li>                                \n              ";
    return buffer;}

  function program4(depth0,data) {
    
    
    return "\n              <li>\n                <a href=\"#\" class=\"login\">Login</a>\n              </li>\n            ";}

    buffer += "<div class=\"navbar navbar-inverse navbar-fixed-top\">\n  <div class=\"navbar-inner\">\n    <div class=\"container\">\n      <a class=\"brand\" href='";
    foundHelper = helpers.url;
    stack1 = foundHelper ? foundHelper.call(depth0, "home", {hash:{}}) : helperMissing.call(depth0, "url", "home", {hash:{}});
    buffer += escapeExpression(stack1) + "'>bookstore</a>\n      <div class=\"nav-collapse collapse\">\n        <ul class=\"nav\">          \n          <li class=\"active\"><a href='";
    foundHelper = helpers.url;
    stack1 = foundHelper ? foundHelper.call(depth0, "home", {hash:{}}) : helperMissing.call(depth0, "url", "home", {hash:{}});
    buffer += escapeExpression(stack1) + "'>Home</a></li>\n          <li><a href='";
    foundHelper = helpers.url;
    stack1 = foundHelper ? foundHelper.call(depth0, "books_list", {hash:{}}) : helperMissing.call(depth0, "url", "books_list", {hash:{}});
    buffer += escapeExpression(stack1) + "'>Books</a></li>\n        </ul>\n      </div>\n\n      <div class=\"auth\">\n        <ul class=\"nav\">\n            ";
    foundHelper = helpers.if_logged_in;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data)}); }
    else { stack1 = depth0.if_logged_in; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    if (!helpers.if_logged_in) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data)}); }
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n        </ul>\n      </div>\n    </div>\n  </div>\n</div>\n\n";
    return buffer;});
});
window.require.register("views/templates/home", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


    buffer += "<div class=\"hero-unit\">\n	<h1>Hello, world!</h1>\n	<p>This is a demo application built with Symfony and chaplin.js</p>\n	<p><a class=\"btn btn-primary btn-large\" href='";
    foundHelper = helpers.url;
    stack1 = foundHelper ? foundHelper.call(depth0, "books_list", {hash:{}}) : helperMissing.call(depth0, "url", "books_list", {hash:{}});
    buffer += escapeExpression(stack1) + "'>View the books!</a></p>\n</div>";
    return buffer;});
});
