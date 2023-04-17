<?php
require_once "header.php";

//require_once "";
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
    <title>Document</title>
</head>

<body>
<main>
    <div class="container">
        <section class="catalog">
            <div class="catalog__header">
                <h1 class="title">Каталог</h1>
                <select class="short" name="sort[]">
                    <option value="0" hidden="hidden">Сортировать</option>
                    <option value="1">По популярности</option>
                    <option value="2">От самой низкой цены</option>
                    <option value="3">От самой высокой цены</option>
                </select>
            </div>

            <div class="catalog__body">
                <div class="catalog__filter filter">
                    <form action="" class="filter__form">
                        <button class="reset">Сбросить все</button>

                        <div class="filter__item">
                            <h2 class="filter__title">Категории</h2>
                            <div class="category filter__body">

                            </div>
                        </div>

                        <div class="filter__item">
                            <h2 class="filter__title">Стиль</h2>
                            <div class="style filter__body">

                            </div>

                        </div>
                        <div class="filter__item">
                            <h2 class="filter__title filter__body">Техника</h2>
                            <div class="material">

                            </div>

                        </div>
                        <div class="filter__item">
                            <h2 class="filter__title">Цена</h2>
                            <div class="filter__price">
                                <input class="price-from" name="priceFrom" type="text" placeholder="от">
                                <input class="price-to" name="priceTo" type="text" placeholder="до">
                            </div>
                        </div>
                        <button class="btn-second btn_catalog">ОК</button>
                </div>
                    </form>


                <div class="catalog__products">
                </div>
            </div>
        </section>


    </div>

</main>
<footer></footer>

<script src="js/basket.js"></script>
<script src="js/catalog.js"></script>
<script src="js/favourites.js"></script>
<script src="js/filter.js"></script>
<script src="js/search.js"></script>
</body>
</html>


