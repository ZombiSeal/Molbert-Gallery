<?php

define('HOST', 'localhost');
define('LOGIN', 'root');
define('PASS', '');
define('DB', 'art_gallery');
$db = new PDO('mysql:host=' . HOST . ';dbname=' . DB, LOGIN,  PASS, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING));
$sth = $db->prepare('SELECT Products.title, Products.img_path, Products.price, Authers.auther_name FROM Products JOIN Authers ON Products.id_auther = Authers.id_auther WHERE Products.id_category in (:categories ;');

$sth->execute(array('categories' => "1,2,3"));
var_dump($sth->fetchAll(PDO::FETCH_ASSOC));
