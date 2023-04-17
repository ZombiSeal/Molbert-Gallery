<?php

namespace model;
use PDO;

define('HOST', 'localhost');
define('LOGIN', 'root');
define('PASS', '');
define('DB', 'art_gallery');
class DB
{
    private $db;

    public function __construct()
    {
        $this->db = new PDO('mysql:host=' . HOST . ';dbname=' . DB, LOGIN,  PASS, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING));
    }

    public function query($sql, $params = [])
    {

        $stmt = $this->db->prepare($sql);

        if ( !empty($params) ) {
            foreach ($params as $key => $value) {
                $stmt->bindValue(":$key", $value);
            }
        }
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}