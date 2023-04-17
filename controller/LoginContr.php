<?php

namespace controller;


use model\Login;
require '../model/Login.php';


class LoginContr
{

    private Login $login;
    public function __construct()
    {
        $this->login = new Login();
    }

    public function login() {
        $errLogin = $this->checkUser($_POST["email"]);

        if($errLogin == "") {
            $result = ["res" => 1];
        } else if ($errLogin == "admin") {
            $result = ["res" => "admin"];
        } else {
            $result = ["res" => 0];
        }
        echo json_encode($result);

    }
    private function checkUser($email) {
        $rowsEmail = $this->login->getUserEmail();
        if(!empty($rowsEmail)){

            $rowsPassword = $this->login->getUserPassword();
            if(md5($_POST["password"]) == $rowsPassword[0]['_password']){
                session_start();
                $_SESSION["id_user"] = $rowsEmail[0]["id_user"];
                if($rowsEmail[0]["role"] == 1) {
                    $errLogin = "";
                } else {
                    $errLogin = "admin";
                }
            } else {
                $errLogin = "password";
            }

        } else {
            $errLogin = "Not user";
        }

        return $errLogin;
    }

}