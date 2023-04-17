<?php

namespace model;

use model\DB;
require 'Db.php';
use PDO;
class Order
{
    private DB $db;
    public function __construct()
    {
        $this->db = new DB();
    }

    public function getDeliveries() {
        return $this->db->query("SELECT * FROM Deliveries");
    }

    public function getPayments() {
        return $this->db->query("SELECT * FROM Payments");
    }

    public function getSale($code){
        $params = ["code" => $code];
        return $this->db->query("SELECT * FROM Sales WHERE _code = :code", $params);
    }

    public function checkOrderNym($num) {
        $params = ["num" => $num];
        return $this->db->query("SELECT * FROM Orders WHERE order_number = :num", $params);
    }

    public function changeAmount($id_product) {
        $params = ["id_product" => $id_product];
        return $this->db->query("UPDATE Products SET  amount = 0 WHERE id_product = :id_product", $params);
    }
    public function addOrder($adress, $info, $order) {

        $paramsAdress = ["street" => $adress["street"], "house" => $adress["house"], "city" => $adress["city"], "country" => $adress["country"]];
        $paramsInfo = ["delivery" => $info["delivery"], "payment" => $info["payment"], "date" => $info["date"]];

        $idSale = $this->getSale($order["sale"]);

        $paramsOrder = ["orderNum" => $order["orderNum"], "id_user" => $order["id_user"] ,"sale" => ($idSale[0]["id_sale"] ?? null)];
        $paramsProduct = ["id_products" => $order["id_products"]];

        $dbh = new PDO('mysql:host=localhost;dbname=art_gallery', 'root',  '', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING));

        try {

            $dbh->beginTransaction();

            $sthInfo = $dbh->prepare("INSERT INTO Orders_info (id_delivery, id_payment, order_data) VALUES (:delivery , :payment, :date)");

            foreach ($paramsInfo as $key => $value) {
                $sthInfo->bindValue(":$key", $value);
            }

            $sthInfo->execute();
            $idInfo = $dbh->lastInsertId();

            if($info["delivery"] != 1) {
                $sthAdress = $dbh->prepare("INSERT INTO Adresses (street,country, city, house) VALUES (:street , :country, :city, :house)");

                foreach ($paramsAdress as $key => $value) {
                    $sthAdress->bindValue(":$key", $value);
                }

                $sthAdress->execute();
                $idAdress = $dbh->lastInsertId();
            } else {
                $idAdress = 1;
            }


            foreach ($paramsProduct["id_products"] as $product) {
                $sthOrder = $dbh->prepare("INSERT INTO Orders (order_number, id_user, id_product, id_info, id_adress, id_sale) VALUE (:orderNum ,:id_user ,:id_product , :id_info, :id_adress ,:sale)");
                foreach ($paramsOrder as $key => $value) {
                    $sthOrder->bindValue(":$key", $value);
                }
                $sthOrder->bindValue(":id_product", $product);
                $sthOrder->bindValue(":id_info", $idInfo);
                $sthOrder->bindValue(":id_adress", $idAdress);

                $sthOrder->execute();
            }
            $dbh->commit();

            return true;


        } catch (PDOExecption $e) {
            $dbh->rollBack();
            print "Error!: " . $e->getMessage() . "</br>";
        }

    }

}