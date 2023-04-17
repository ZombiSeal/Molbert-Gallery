<?php

namespace model;
use model\DB;
use PDO;

require 'Db.php';
class Page
{
    private DB $db;
    public function __construct()
    {
        $this->db = new DB();
    }


    public function showPage($id){
        $params = ["id_product" => $id];
       return $this->db->query("SELECT Products.id_product, Products.title, Products.img_path, Products.price, Authers.auther_name, 
        Products.description, Products.amount, Categories.category, Materials.material, Styles.style, Sizes.width, Sizes.height
         FROM Products JOIN Authers ON Products.id_auther = Authers.id_auther 
         JOIN Categories ON Products.id_category = Categories.id_category 
         JOIN Materials ON Products.id_material = Materials.id_material 
         JOIN Styles ON Products.id_style = Styles.id_style 
         JOIN Sizes ON Products.id_size = Sizes.id_size 
         WHERE Products.id_product = :id_product;", $params);
    }
}