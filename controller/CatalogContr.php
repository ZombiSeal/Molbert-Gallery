<?php

namespace controller;

use model\Catalog;
include  '../model/Catalog.php';
class CatalogContr
{
    private Catalog $catalog;
    public function __construct()
    {
        $this->catalog = new Catalog();
    }
    public function getProducts(){
        $products = $this->catalog->getProducts();
        echo json_encode($products);

    }

    public function getCategories() {
        $categories = $this->catalog->getCategories();
        echo json_encode($categories);
    }

    public function getStyles() {

        $styles = $this->catalog->getStyles();
        echo json_encode($styles);


    }
    public function getMaterials() {
        $materials = $this->catalog->getMaterial();

        echo json_encode($materials);

    }
    public function showSearch() {
        $search = $this->catalog->search();
        echo  json_encode($search);
    }

    public function showSearchProducts() {
        $search = $this->catalog->search();

       echo json_encode($search);

    }
    private function getFilterData() {
        $categories = (isset($_POST["categories"])) ? implode(",", $_POST["categories"]) : null;
        $styles = (isset($_POST["styles"])) ?  implode(",", $_POST["styles"]) : null;
        $materials = (isset($_POST["materials"])) ?  implode(",", $_POST["materials"]) : null;
        $priceFrom = (!empty($_POST["priceFrom"])) ? $_POST["priceFrom"] : 0;
        $priceTo = (!empty($_POST["priceTo"])) ? $_POST["priceTo"] : 1000000;
        $sort = (isset($_POST["sort"])) ? $_POST["sort"]: 0;

        $result = ["categories" => $categories,
            "styles" => $styles,
            "materials" => $materials,
            "priceFrom" => $priceFrom,
            "priceTo" => $priceTo,
            "sort" => $sort];

        return $result;
    }
    public function filter() {
        $result = $this->getFilterData();
        $filter = $this->catalog->filter($result);

        echo json_encode($filter);
    }


    private function isLogin() {
        session_start();
        if(!empty($_SESSION["id_user"])) {
            $result = 1;
        }  else {
            $result = 0;
        }

        return $result;
    }

    public function isFavourites() {
        session_start();

        $sql = '';

        if(!empty($_SESSION["id_user"])) {
            $id_user = $_SESSION["id_user"];
            $sql = $this->catalog->isUserFav($id_user);
        }


        echo  json_encode($sql);

    }
    public function favourites() {
        session_start();
        $login = $this->isLogin();

        if($login == 1) {
            if(!empty($_SESSION["id_user"])) {
                $id_user = $_SESSION["id_user"];
            }

            if(isset($_POST["id_product"])) {
                $id_product = $_POST["id_product"];
            }


            $sql = ($this->catalog->isUserFav($id_user));

            $sqlProducts = [];
            foreach ($sql as $el) {
                array_push($sqlProducts, $el["id_product"]);
            }

            if(in_array($id_product, $sqlProducts)) {
                $this->catalog->deleteFavorites($id_user, $id_product);
                $res = 0;
            } else {
                $this->catalog->addFavourites($id_user, $id_product);
                $res = 1;
            }

        }

//        $result = ["login" => $login, "res" => $res];
        $result = ["login" => $login, "res" => $res ?? null];

        echo json_encode($result);

    }



}