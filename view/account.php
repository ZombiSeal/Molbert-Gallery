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
<style>
    .search {
        display: none;
    }
</style>
<body>
    <?php require "header.php"?>
    <div class="container">
        <section class="user-account">
            <h1 class="title">Мой аккаунт</h1>
            <div class="user-account__body">
                <nav class="user-account__nav">
                    <ul class="user-account__list">
                        <li class="user-account__item"><a href="account.php?route=data" data-href="data" class="user-account__link user-account__link_data">Даные аккаунта</a></li>
                        <li class="user-account__item"><a href="account.php?route=order" data-href="order" class="user-account__link user-account__link_order">Мои заказы</a></li>
                        <li class="user-account__item"><a href="account.php?route=fav" data-href="fav"  class="user-account__link user-account__link_fav">Избранное</a></li>
                        <li class="user-account__item"><a href="login.php" data-href="exit"   data-page="exit" class="user-account__link user-account__link_exit">Выйти</a></li>
                    </ul>
                </nav>
                <div class="user-account__info">
                </div>
            </div>

        </section>
    </div>

    <script src="js/basket.js"></script>
    <script src="js/catalog.js"></script>
    <script src="js/favourites.js"></script>
    <script src="js/register.js"></script>
    <script src="js/account.js"></script>
</body>

</html>
