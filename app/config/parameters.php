<?php

$container->setParameter('database_host', getenv('MYSQL_PORT_3306_TCP_ADDR') !== false ? getenv('MYSQL_PORT_3306_TCP_ADDR') : '127.0.0.1');
$container->setParameter('database_user', 'admin');
$container->setParameter('database_password', 'changeme');
$container->setParameter('secret', 'ThisTokenIsNotSoSecretChangeIt');