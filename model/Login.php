<?php

namespace model;

use model\DB;
require 'Db.php';
class Login
{
    private DB $db;
    public function __construct()
    {
        $this->db = new DB();
    }

    public function getUserEmail() {
        if(isset($_POST["email"])) {
            $params = ["email" => $_POST["email"]];
            return $this->db->query('SELECT * FROM `Users` WHERE email = :email' , $params);
        }
    }

    public function getUserPassword(){
        if(isset($_POST["password"])) {
            $params = ["email" => $_POST["email"]];
            return $this->db->query('SELECT _password FROM `Users` WHERE email = :email' , $params);
        }
    }


}