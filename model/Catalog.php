<?php

namespace model;

use model\DB;
require 'Db.php';
class Catalog
{
    private DB $db;
    public function __construct()
    {
        $this->db = new DB();
    }

    public function getProducts() {
        return $this->db->query("SELECT Products.id_product, Products.title, Products.img_path, Products.price, Products.amount, Authers.auther_name FROM Products JOIN Authers ON Products.id_auther = Authers.id_auther; ");
    }
    public function getCategories() {
        return $this->db->query("SELECT * FROM Categories");
    }

    public function getStyles() {
        return $this->db->query("SELECT * FROM Styles");
    }

    public function getMaterial(){
        return $this->db->query("SELECT * FROM Materials");
    }

    public function search() {
        if(isset($_POST["search"])) {
            $params = ["search" => "%{$_POST["search"]}%"];
            return $this->db->query("SELECT Products.amount, Products.id_product, Products.title, Products.img_path, Products.price, Authers.auther_name FROM Products JOIN Authers ON Products.id_auther = Authers.id_auther WHERE Products.title LIKE :search; ", $params);
        }

    }

    private function getFilterSql($options) {
        $sql = "SELECT Products.amount, Products.id_product, Products.title, Products.img_path, Products.price, Authers.auther_name, o._count 
                FROM Products JOIN Authers ON Products.id_auther = Authers.id_auther 
                LEFT OUTER JOIN (SELECT id_product, COUNT(Orders.id_product) as _count FROM Orders GROUP BY (Orders.id_product)) as o ON Products.id_product = o.id_product
                WHERE  Products.price BETWEEN {$options['priceFrom']} AND {$options['priceTo']}";

        if (isset($options["categories"])) {
            $sql .= " AND Products.id_category IN ({$options['categories']})";
        }

        if (isset($options["styles"])) {
            $sql .= " AND Products.id_style IN ({$options['styles']})";
        }

        if (isset($options["materials"])) {
            $sql .= " AND Products.id_material IN ({$options['materials']})";
        }


        if($options["sort"] == 1) {
            $sql .= " ORDER BY o._count DESC";
        } else if($options["sort"] == 2) {
            $sql .= " ORDER BY Products.price ASC";
        } else if($options["sort"] == 3) {
            $sql .= " ORDER BY Products.price DESC";
        }

        return $sql;
    }
    public function filter($options) {
        $sql = $this->getFilterSql($options);
        return $this->db->query($sql);
    }

    public function isUserFav($id_user) {
        $params = ["id_user" => $id_user];
        return $this->db->query('SELECT * FROM Favourites WHERE id_user = :id_user', $params);
    }

    public function isFavourite($id_user, $id_product) {
        $params = ["id_user" => $id_user, "id_product" => $id_product];
        return $this->db->query('SELECT * FROM Favourites WHERE id_user = :id_user AND id_product = :id_product', $params);
    }
    public function addFavourites($id_user, $id_product) {
        $params = ["id_user" => $id_user, "id_product" => $id_product];
        $this->db->query('INSERT INTO Favourites ( id_user, id_product) VALUES ( :id_user, :id_product)', $params);
    }

    public function deleteFavorites($id_user, $id_product) {
        $params = ["id_user" => $id_user, "id_product" => $id_product];
        $this->db->query('DELETE FROM Favourites WHERE id_user = :id_user AND id_product = :id_product', $params);

    }


}