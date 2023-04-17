<?php

namespace model;

use model\DB;
use PDO;

require 'Db.php';
class Basket
{
    private DB $db;
    public function __construct()
    {
        $this->db = new DB();
    }

    public function getProducts($id) {
        $params = ["id" => $id];
        return $this->db->query("SELECT Products.id_product, Products.title, Products.img_path, Products.price, Products.amount, Authers.auther_name, Sizes.width, Sizes.height FROM Products JOIN Authers ON Products.id_auther = Authers.id_auther JOIN Sizes ON Products.id_size = Sizes.id_size WHERE Products.id_product = :id; ", $params);
    }
}