<?php

namespace controller;
use model\Order;
include  '../model/Order.php';
class OrderContr
{
    private Order $order;

    public function __construct()
    {
        $this->order = new Order();
    }

    private function getDelivery() {
        return $this->order->getDeliveries();
    }

    private function getPayment() {
        return $this->order->getPayments();
    }

    private function getProducts(){
        session_start();
        return $_SESSION["basket"];
    }

    public function getData() {
        $delivery = $this->getDelivery();
        $payment = $this->getPayment();
        $products = $this->getProducts();

        $result = ["delivery" => $delivery, "pay" => $payment, "products" => $products];
        echo  json_encode($result);
    }

    public function setSale() {
        if(!empty($_POST["sale"])) {
            $sql = $this->order->getSale($_POST["sale"]);
            if($sql) {
                $sale = $sql[0]["sale"];
            } else {
                $sale = null;
            }
        } else {
            $sale = 0;
        }
        echo json_encode($sale);
    }

    public function ajaxAdress(){
        $result = ["error" => $this->checkAdress($_POST["values"])];
        echo json_encode($result);
    }

    private function checkAdress($adress){
        if(empty($adress)) {
            $err = "Введите данные";
        } else {
            $err = "";
        }
        return $err;
    }

    public function addOrder(){
        session_start();

        $streetErr = "";
        $houseErr = "";
        $cityErr = "";
        $countryErr = "";

        if(isset($_POST["delivery"])) {
            $deliveryErr = "";
            $delivery = $_POST["delivery"];

            if($_POST["delivery"] != 1) {
                $streetErr = $this->checkAdress($_POST["adress"]["street"]);
                $houseErr = $this->checkAdress($_POST["adress"]["house"]);
                $cityErr = $this->checkAdress($_POST["adress"]["city"]);
                $countryErr = $this->checkAdress($_POST["adress"]["country"]);
            }
        } else {
            $delivery = null;
            $deliveryErr = "error";
        }


        if(isset($_POST["payment"])) {
            $paymentErr = "";
            $payment = $_POST["payment"];
        } else {
            $paymentErr = "error";
            $payment = null;
        }


        $orderNum = "";

        if($streetErr . $houseErr . $cityErr . $countryErr . $deliveryErr . $paymentErr == "") {

            $flag = false;
            while ($flag == false) {

                for ($i = 0; $i < 10; $i++) {
                    $num = mt_rand(0, 9);
                    $orderNum .= $num;
                }

                $checkNum = $this->order->checkOrderNym($orderNum);
                if(count($checkNum) == 0){
                    $flag = true;
                }

            }

            $date = date("Y-m-d");
            $info = ["delivery" => $delivery, "payment" => $payment, "date" => $date];

            $sale = (!empty($_POST["sale"])) ? $_POST["sale"] : null;
            $id_products = array_keys($_SESSION["basket"]);

            $order = ["orderNum" => $orderNum, "id_user" => $_SESSION["id_user"], "id_products" => $id_products, "sale" => $sale];

            $sql = $this->order->addOrder($_POST["adress"], $info, $order);
            if ($sql) {
                $res = 1;
                foreach ($order["id_products"] as $id) {
                    $this->order->changeAmount($id);
                }
                unset($_SESSION["basket"]);

            } else {
                $res = 0;
            }

        } else {
            $res = 0;
        }

        echo json_encode(["res" => $res,
                            "errors" => ["delErr" => $deliveryErr, "payErr" => $paymentErr,
                                "streetErr" => $streetErr,
                                "houseErr" => $houseErr,
                                "cityErr" => $cityErr,
                                "countryErr" => $countryErr]]);

    }
}