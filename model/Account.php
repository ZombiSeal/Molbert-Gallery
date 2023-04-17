<?php

namespace model;
use model\DB;
use PDO;
require 'Db.php';

session_start();

class Account
{
    private DB $db;
    public function __construct()
    {
        $this->db = new DB();
    }

    public function getUserInfo() {
        $params = ["id_user" => $_SESSION["id_user"]];
        return $this->db->query("SELECT * FROM Users WHERE id_user = :id_user", $params);
    }

    public function  existsEmail() {
        if(isset($_POST["email"])) {
            $params = ["email" => $_POST["email"]];
            return $this->db->query('SELECT * FROM `Users` WHERE email = :email' , $params);
        }
    }

    public function checkUserPassword(){
        $params = ["id_user" => $_SESSION["id_user"], "pass" => md5($_POST["userPassword"])];
        return $this->db->query('SELECT * FROM `Users` WHERE _password = :pass AND id_user = :id_user' , $params);
    }
    public function editUserInfo(){
        $params = ["id_user" => $_SESSION["id_user"], "firstname" => $_POST["firstName"], "lastname" => $_POST["lastName"], "email" => $_POST["email"]];
        return $this->db->query("UPDATE Users SET firstname = :firstname, lastname = :lastname, email = :email WHERE id_user = :id_user", $params);
    }

    public function editUserPass(){
        $params = ["id_user" => $_SESSION["id_user"], "pass" => md5($_POST["password"])];
        return $this->db->query("UPDATE Users SET _password = :pass WHERE id_user = :id_user", $params);
    }

    public  function getOrdersNum(){
        $params = ["id_user" => $_SESSION["id_user"]];
        return $this->db->query("SELECT order_number FROM ORDERS WHERE Orders.id_user = :id_user", $params);
    }

    public function getOrderInf($num) {
        $params = ["order_number" => $num];
        return $this->db->query("SELECT Statuses._status, Orders_info.order_data
                FROM ORDERS JOIN Orders_info ON Orders.id_info = Orders_info.id_info
                 JOIN Statuses ON Orders_info.id_status = Statuses.id_status  WHERE Orders.order_number = :order_number", $params);
    }
    public function getOrder($num) {
        $params = ["order_number" => $num];
        return $this->db->query("SELECT Orders.id_product, Sales.sale, Products.title, Products.img_path, Products.price, Authers.auther_name 
FROM Orders JOIN Orders_info ON Orders.id_info = Orders_info.id_info 
LEFT JOIN Sales ON Orders.id_sale = Sales.id_sale 
JOIN Products ON Orders.id_product = Products.id_product 
JOIN Authers ON Products.id_auther = Authers.id_auther
WHERE Orders.order_number = :order_number", $params);
    }

    public function getFav() {
        $params = ["id_user" => $_SESSION["id_user"]];
        return $this->db->query("SELECT Products.id_product, Products.img_path, Products.price, Products.amount, Products.title, Authers.auther_name 
FROM Products JOIN Authers ON Products.id_auther = Authers.id_auther 
JOIN Favourites ON Products.id_product = Favourites.id_product
WHERE Favourites.id_user = :id_user", $params);
    }

    public function deleteFavorites($id_user, $id_product) {
        $params = ["id_user" => $id_user, "id_product" => $id_product];
        $this->db->query('DELETE FROM Favourites WHERE id_user = :id_user AND id_product = :id_product', $params);

    }

}