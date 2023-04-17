<?php

namespace controller;

use \model\Register;
require '../model/Register.php';


class RegisterContr
{
    protected Register $register;
    public function __construct()
    {
        $this->register = new Register();
    }

    public function ajaxFirstName() {
        $result = array("error" => $this->checkFirstName($_POST['values']));
        echo json_encode($result);
    }

    public function ajaxLastName() {
        $result = array("error" => $this->checkLastName($_POST['values']));
        echo json_encode($result);
    }

    public function ajaxEmail(){
        $result = array("error" => $this->checkEmail($_POST['values']));
        echo json_encode($result);
    }

    public  function ajaxExistsEmail(){
        $result = array("error" => $this->existsEmail($_POST['values']));
        echo json_encode($result);
    }

    public function ajaxPassword(){
        $result = array("error" => $this->checkPassword($_POST['values']));
        echo json_encode($result);
    }

    public function ajaxRepeatPassword(){
        $result = array("error" => $this->checkRepeatPassword($_POST['passwordRepeat']));
        echo json_encode($result);
    }

    public function submit() {
        if(isset($_POST['firstName'])) {
            $errFirstName = $this->checkFirstName($_POST['firstName']);
        }

        if(isset($_POST['lastName'])) {
            $errLastName = $this->checkLastName($_POST['lastName']);
        }

        if(isset($_POST['email'])) {
            $errEmail = $this->checkEmail($_POST['email']);
            $errExistsEmail = $this->existsEmail($_POST['email']);
        }

        if(isset($_POST['password'])) {
            $errPassword = $this->checkPassword($_POST['password']);
        }

        if(isset($_POST['passwordRepeat'])) {
            $errRepeatPassword = $this->checkRepeatPassword($_POST['passwordRepeat']);
        }

        if($errFirstName . $errLastName . $errEmail . $errExistsEmail . $errPassword . $errRepeatPassword == "" ) {
            $this->register->register();
            $result = ["res" => 1];
        } else {
            $result = ["res" => 0];
        }

        echo json_encode($result);

    }
    protected function checkFirstName($firtName): string
    {
        if(empty($firtName)) {
            $err = "Введите имя";
        } elseif (!preg_match("/^([A-Za-zА-Яа-я-]{2,})$/u", $firtName)) {
            $err = "Содержатся цифры или недостаочная длина";
        } else {
            $err = "";
        }
        return $err;
    }
    private function checkLastName($lastName): string
    {
        if(empty($lastName)) {
            $err = "Введите фамилию";
        } elseif (!preg_match("/^([A-Za-zА-Яа-я-]{2,})$/u", $lastName)) {
            $err = "Содержатся цифры или недостаочная длина";
        } else {
            $err = "";
        }
        return $err;
    }

    private function checkEmail($email): string
    {
        if(empty($email)) {
            $err = "Введите e-mail";
        } elseif (!preg_match("/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}/", $email)){
            $err = "Неправильный формат e-mail";
        } else {
            $err = "";
        }
        return $err;
    }

    private function  existsEmail($email) {

        if(!empty($this->register->existsEmail($email))) {
            $errExistsEmail = "Пользователь с таким e-mail уже существует";
        } else {
            $errExistsEmail = $this->checkEmail($email);
        }

        return $errExistsEmail;
    }


    private function checkPassword($password): string
    {
        if(empty($password)) {
            $err = "Введите пароль";
        } elseif (strlen($password) < 6) {
            $err = "Ненадежный пароль(минимум 6 символов)";
        } else {
            $err = "";
        }
        return $err;
    }
    private function checkRepeatPassword($repeatPassword): string
    {
        if($repeatPassword != $_POST["password"]) {
            $err = "Повторите пароль";
        } else {
            $err = "";
        }
        return $err;
    }


}