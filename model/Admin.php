<?php

namespace model;
use model\DB;
use PDO;

require 'Db.php';
class Admin
{
    private DB $db;

    public function __construct()
    {
        $this->db = new DB();
    }

    public function getUsers() {
        return $this->db->query("SELECT * FROM Users WHERE role = 1");
    }

    public function delUser(){
        $params = ["id_user" => $_POST["id"]];
        return $this->db->query("DELETE FROM Users WHERE id_user = :id_user", $params);
    }

    public function getProducts() {
        return $this->db->query("SELECT Products.*, Authers.auther_name, Categories.category, Styles.style, Materials.material, Sizes.width, Sizes.height 
FROM Products JOIN Authers ON Products.id_auther = Authers.id_auther
JOIN Categories ON Products.id_category = Categories.id_category
JOIN Styles ON Products.id_style = Styles.id_style
JOIN Materials ON Products.id_material = Materials.id_material
JOIN Sizes ON Products.id_size = Sizes.id_size ORDER BY Products.id_product DESC");
    }

    public function getProduct($id) {
        $paramId = ["id_product" => $id];
        return $this->db->query("SELECT Products.*, Authers.auther_name, Categories.category, Styles.style, Materials.material, Sizes.width, Sizes.height 
FROM Products JOIN Authers ON Products.id_auther = Authers.id_auther
JOIN Categories ON Products.id_category = Categories.id_category
JOIN Styles ON Products.id_style = Styles.id_style
JOIN Materials ON Products.id_material = Materials.id_material
JOIN Sizes ON Products.id_size = Sizes.id_size WHERE id_product = :id_product", $paramId);

    }
    public function getAuthers(){
        return $this->db->query("SELECT * FROM Authers ORDER BY id_auther DESC");
    }

    public  function getAuther($id) {
        $paramId = ["id_auther" => $id];
        return $this->db->query("SELECT * FROM Authers WHERE id_auther = :id_auther", $paramId);
    }
    public function getCategories(){
        return $this->db->query("SELECT * FROM Categories");
    }

    public function getStyles(){
        return $this->db->query("SELECT * FROM Styles");
    }
    public function getMaterials(){
        return $this->db->query("SELECT * FROM Materials");
    }
    public function getSize(){
        return $this->db->query("SELECT * FROM Sizes");
    }

    public function addProduct($data) {
        $params = [
            "title" => $data["title"],
            "img_path" => $data["img_path"],
            "description" => $data["description"],
            "price" => $data["price"],
            "id_auther" => $data["auther"],
            "id_category" => $data["category"],
            "id_style" => $data["style"],
            "id_material" => $data["material"],
            "id_size" => $data["size"],
            "amount" => $data["amount"]];

        $dbh = new PDO('mysql:host=localhost;dbname=art_gallery', 'root',  '', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING));
        $sth = $dbh->prepare("INSERT INTO Products (title, img_path, description, price, id_auther, id_category, id_style, id_material, id_size, amount) 
        VALUE (:title, :img_path, :description, :price, :id_auther, :id_category, :id_style, :id_material, :id_size, :amount)");

        foreach ($params as $key => $value) {
            $sth->bindValue(":$key", $value);
        }

        $sth->execute();
        $id = $dbh->lastInsertId();

        return $this->getProduct($id);
    }

    public function delProduct() {
        $params = ["id_product" => $_POST["id"]];
        return $this->db->query("DELETE FROM Products WHERE id_product = :id_product", $params);

    }
    public function updateProduct($data) {
        $params = ["id_product" => $data["id_product"],
            "title" => $data["title"],
            "img_path" => $data["img_path"],
            "description" => $data["description"],
            "price" => $data["price"],
            "id_auther" => $data["auther"],
            "id_category" => $data["category"],
            "id_style" => $data["style"],
            "id_material" => $data["material"],
            "id_size" => $data["size"],
            "amount" => $data["amount"] ?? 1];
        $this->db->query("UPDATE Products SET title = :title, img_path = :img_path, 
                    description = :description, price = :price,
                    id_auther = :id_auther, id_category = :id_category, id_style = :id_style, 
                    id_material = :id_material, id_size = :id_size, amount = :amount WHERE id_product = :id_product", $params);

        return $this->getProduct($data["id_product"]);
    }


    public function addAuther($data) {
        $params = ["auther_name" => $data["auther"]];

        $dbh = new PDO('mysql:host=localhost;dbname=art_gallery', 'root',  '', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING));
        $sth = $dbh->prepare("INSERT INTO Authers (auther_name) 
        VALUE (:auther_name)");

        foreach ($params as $key => $value) {
            $sth->bindValue(":$key", $value);
        }

        $sth->execute();
        $id = $dbh->lastInsertId();

        return $this->getAuther($id);
    }

    public function delAuther() {
        $params = ["id_auther" => $_POST["id"]];
        return $this->db->query("DELETE FROM Authers WHERE id_auther = :id_auther", $params);

    }
    public function updateAuther($data) {
        $params = ["id_auther" => $data["id_auther"],
            "auther_name" => $data["auther"]];
        $this->db->query("UPDATE Authers SET auther_name = :auther_name WHERE id_auther = :id_auther", $params);

        return $this->getAuther($data["id_auther"]);
    }



    public function checkSale($code){
        $params = ["code" => $code];
        return $this->db->query("SELECT * FROM Sales WHERE _code = :code", $params);

    }
    public  function getSales() {
        return $this->db->query("SELECT * FROM Sales");
    }
    public  function getSale($id) {
        $paramId = ["id_sale" => $id];
        return $this->db->query("SELECT * FROM Sales WHERE id_sale = :id_sale", $paramId);
    }
    public function addSale($data) {
        $params = ["code" => $data["code"], "sale" => $data["sale"]];

        $dbh = new PDO('mysql:host=localhost;dbname=art_gallery', 'root',  '', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING));
        $sth = $dbh->prepare("INSERT INTO Sales (_code, sale) VALUE (:code, :sale)");

        foreach ($params as $key => $value) {
            $sth->bindValue(":$key", $value);
        }

        $sth->execute();
        $id = $dbh->lastInsertId();

        return $this->getSale($id);
    }

    public function delSale() {
        $params = ["id_sale" => $_POST["id"]];
        return $this->db->query("DELETE FROM Sales WHERE id_sale = :id_sale", $params);
    }

    public function getStatuses(){
        return $this->db->query("SELECT * FROM Statuses");
    }
    public  function getOrders() {
        return $this->db->query("SELECT Orders.order_number, Orders_info.id_info,Statuses.id_status, Statuses._status 
                    FROM Orders JOIN Orders_info ON Orders.id_info = Orders_info.id_info
                    JOIN Statuses ON Orders_info.id_status = Statuses.id_status");
    }

    public function updateOrders($data) {
        $params = ["id_info" => $data["id_info"], "id_status" => $data["id_status"]];
        return $this->db->query("UPDATE Orders_info SET id_status = :id_status WHERE id_info = :id_info", $params);
    }
}