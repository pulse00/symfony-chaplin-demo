#!/bin/sh

set -e

php app/console doctrine:database:create
php app/console doctrine:schema:create
php app/console doctrine:fixtures:load --no-interaction
php app/console assets:install web --symlink