<?php

namespace controller;
use model\Admin;
require  '../model/Admin.php';
class AdminContr
{
    private Admin $admin;
    public function __construct()
    {
        $this->admin = new Admin();
    }

    public function showUsers(){
        $users = $this->admin->getUsers();
        echo json_encode(["route" => "users", "data" => $users]);
    }

    public function delUser() {
        $del = $this->admin->delUser();
        echo json_encode($del);
    }

    public function showProducts(){
        $data = $this->admin->getProducts();
        $authers = $this->admin->getAuthers();
        $categories = $this->admin->getCategories();
        $styles = $this->admin->getStyles();
        $materials = $this->admin->getMaterials();
        $sizes = $this->admin->getSize();
        echo json_encode(["route" => "products", "data" => $data, "authers" => $authers, "categories" => $categories, "materials" => $materials, "styles" => $styles, "sizes" => $sizes]);
    }
    private function checkProduct($data){
        $titleErr = (empty($data["title"])) ? "empty" : "";
        $imgErr = (empty($data["img_path"])) ? "empty" : "";
        $descErr = (empty($data["description"])) ? "empty" : "";
        $priceErr = (empty($data["price"])) ? "empty" : "";

        if($titleErr . $priceErr . $descErr . $imgErr == "") {
            $errors = [];
        } else {
            $errors = ["titleErr" => $titleErr, "imgErr" => $imgErr, "descErr" => $descErr, "priceErr" => $priceErr];
        }
        return $errors;
    }
    private function checkAuther($data){
        $nameErr = (empty($data["auther"])) ? "empty" : "";

        if($nameErr == "") {
            $errors = [];
        } else {
            $errors = ["nameErr" => $nameErr];
        }
        return $errors;
    }

    private function checkSale($data){
        $codeErr = (empty($data["code"])) ? "empty" : "";
        $saleErr = (empty($data["sale"])) ? "empty" : "";
        $dbCodeErr = (!empty($this->admin->checkSale($data["code"]))) ? "in db" : "";

        if($codeErr . $saleErr . $dbCodeErr == "") {
            $errors = [];
        } else {
            $errors = ["codeErr" => $codeErr, "saleErr" => $saleErr, "dbCodeErr" => $dbCodeErr];
        }
        return $errors;
    }

    public function editProduct() {
        $data = [];
        parse_str($_POST["values"], $data);

            if ($_POST["formAction"] == "update") {
                if(empty($this->checkProduct($data))) {
                    $this->admin->updateProduct($data);
                    $product = $this->admin->getProduct($data["id_product"]);
                }
                $act = "update";
            }

            if($_POST["formAction"] == "add") {
                if(empty($this->checkProduct($data))) {
                    $productInfo = $this->admin->addProduct($data);
                    $product = $productInfo;
                }
                $act = "add";
            }

        echo json_encode(["act" => $act, "product" => $product ?? null, "errors" => $this->checkProduct($data)]);
    }

    public function delProduct() {
        $del = $this->admin->delProduct();
        echo json_encode($del);
    }


    public function showAuthers(){
        $authers = $this->admin->getAuthers();
        echo json_encode(["route" => "authers", "authers" => $authers]);
    }
    public function delAuther(){
        $del = $this->admin->delAuther();
        echo json_encode($del);
    }

    public function editAuther() {
        $data = [];
        parse_str($_POST["values"], $data);

        if ($_POST["formAction"] == "update") {
            if(empty($this->checkAuther($data))) {
                $this->admin->updateAuther($data);
                $auther = $this->admin->getAuther($data["id_auther"]);
            }
            $act = "update";
        }

        if($_POST["formAction"] == "add") {
            if(empty($this->checkAuther($data))) {
                $autherInfo = $this->admin->addAuther($data);
                $auther = $autherInfo;
            }
            $act = "add";
        }

        echo json_encode(["act" => $act, "auther" => $auther ?? null, "errors" => $this->checkAuther($data)]);
    }


    public function showSales(){
        $sales = $this->admin->getSales();
        echo json_encode(["route" => "sales", "sales" => $sales]);
    }
    public function delSale(){
        $del = $this->admin->delSale();
        echo json_encode($del);
    }
    public function editSale() {
        $data = [];
        parse_str($_POST["values"], $data);

        if($_POST["formAction"] == "add") {
            if(empty($this->checkSale($data))) {
                $saleInfo = $this->admin->addSale($data);
                $sale = $saleInfo;
            }
            $act = "add";
        }

        echo json_encode(["act" => $act, "sale" => $sale ?? null, "errors" => $this->checkSale($data)]);
    }


    public function showOrders(){
        $orders = $this->admin->getOrders();
        $orders = array_map("unserialize", array_unique(array_map("serialize", $orders)));
        $statuses = $this->admin->getStatuses();
        echo json_encode(["route" => "orders", "orders" => $orders, "statuses" => $statuses]);
    }

    public function editOrder(){
        $update = $this->admin->updateOrders($_POST);
    }
}