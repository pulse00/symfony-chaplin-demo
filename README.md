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

## Vagrant

This demo comes with a vagrant/docker configuration which has everything pre-installed inside the `vagrant` directory.

If you have vagrant installed, simply run `vagrant up` and ssh into the box using `vagrant ssh`.

The application will be exposed on `http://localhost:8888/app_dev.php`.

From there you can obtain php / node shells through docker containers:

### Docker


#### Containers

`pulse00/nginx-php` will run an nginx server with a php-fpm backend providing the environment for the symfony app.


`pulse00/chaplinjs` will run the `brunch -w` command after starting up vagrant.

#### PHP shell

`sudo docker run -i -t -rm  -link mysql:mysql -v /vagrant:/var/www -w /var/www -entrypoint='bash' pulse00/nginx-php -c 'bash'`

#### Brunch shell

`sudo docker run -i -t -rm -v /vagrant/client:/var/www -w /var/www -entrypoint='bash' pulse00/chaplinjs -c 'bash'`
