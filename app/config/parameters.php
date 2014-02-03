<?php

$container->setParameter('database_host', getenv('MYSQL_PORT_3306_TCP_ADDR'));
$container->setParameter('database_user', 'admin');
$container->setParameter('database_password', 'yourpassword');

