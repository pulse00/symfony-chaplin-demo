Symfony/chaplin.js single page app
==================================

This is a demo for a single page application implemented
with Symfony as the REST backend and [chaplin.js](https://github.com/chaplinjs/chaplin)
as the frontend.

This setup adds the following bundles to the standard-edition of Symfony:

- [FOSUserBundle](https://github.com/FriendsOfSymfony/FOSUserBundle)
- [FOSRestBundle](https://github.com/FriendsOfSymfony/FOSRestBundle)
- [FOSOAuthServerBundle](https://github.com/FriendsOfSymfony/FOSOAuthServerBundle)
- [FOSJSRoutingBundle](https://github.com/FriendsOfSymfony/FOSJsRoutingBundle)
- [JMSSerializerBundle](https://github.com/schmittjoh/JMSSerializerBundle)
- [SonataSEOBundle](https://github.com/sonata-project/SonataSeoBundle)


The purpose of this app is to demonstrate the following concepts:

- Providing a REST backend for a backbone.js / chaplin frontend
- Securing the REST backend using oauth2 2-legged authentication
- Reusing Symfony routes for the chaplin router to make full use of Symfonys environment concepts [prod/dev/etc]
- Reusing serverside rendered markup from 3rd party bundles (e.g. FOSUserBundle login-form)
- Provide SEO metadata for the initial page markup for public facing websites


## Installation

- `curl -s https://getcomposer.org/installer | php && ./composer.phar install`
- `php app/console doctrine:database:create`
- `php app/console doctrine:schema:create`
- `php app/console doctrine:fixtures:load`
- Create a virtualhost `http://bookstore.local` pointing the DocRoot to the `web` folder
- Access `http://bookstore.local`.
- Login with user `chaplin` password `symfony`

