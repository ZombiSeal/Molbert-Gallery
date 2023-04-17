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
    <?php require "header.php"; ?>

    <div class="container">
        <section class="basket">
            <h1 class="title">Корзина</h1>
            <div class="basket__wrapper">
                <div class="table-container">
                </div>
                <div class="total-price">
                    <h2>Ваш заказ</h2>
                    <div class="total-price__txt">
                        <p class="total-price__subtitle">Итого к оплате</p>
                        <p class="total-price__val bigger-txt"></p>
                    </div>
                </div>
                <div class="basket__btn">
                    <a href="catalog.php" class="basket__btn-link btn-white">Вернуться к покупкам</a>
                    <a href="order.php" class="basket__btn-link btn">Оформить заказ</a>
                </div>
            </div>

        </section>
    </div>

    <script src="js/basket.js"></script>
</body>
</html>
