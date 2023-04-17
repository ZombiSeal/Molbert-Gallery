<?php

namespace model;

use model\DB;
require 'Db.php';

class Register
{
    private DB $db;
    public function __construct()
    {
        $this->db = new DB();
    }

    public function  existsEmail() {
        if(isset($_POST["values"])) {
            $params = ["email" => $_POST["values"]];
            return $this->db->query('SELECT * FROM `Users` WHERE email = :email' , $params);
        }
    }
    public function register() {
        if(isset($_POST["firstName"]) && isset($_POST["lastName"]) && isset($_POST["email"]) && isset($_POST["password"]) && isset($_POST["passwordRepeat"])){

            $params = [
                'firstName' => $_POST["firstName"],
                'lastName' => $_POST["lastName"],
                'email' => $_POST["email"],
                'password' => md5($_POST["password"])
            ];

            $this->db->query('INSERT INTO Users ( firstName, lastName, email, _password ) VALUES ( :firstName, :lastName, :email, :password )', $params);
        }

    }


}