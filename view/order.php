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
        <section class="order">
            <h1 class="title">Оформление заказа</h1>
            <div class="order__container">
                <div class="order__col" action="">
                    <form class="delivery order__form">
                        <h2 class="order__form-title">Способ доставки</h2>
                        <div class="delivery__form order__form-item">

                        </div>
                    </form>
                    <form class="adress order__form">
                        <h2 class="order__form-title">Адрес доставки</h2>
                        <div class="adress__form order__form-item">
                            <p class="adress__form-subtitle">Улица</p>
                            <div class="adress__street">
                                <input class="adress__street-name input" name="street" type="text" placeholder="Улица">
                                <input class="adress__street-house input" name="house" type="text" placeholder="Дом">
                            </div>

                            <p class="adress__form-subtitle">Город</p>
                            <input class="adress__city input" name="city" type="text" placeholder="Город">

                            <p class="adress__form-subtitle">Страна</p>
                            <input class="adress__country input" name="country" type="text" placeholder="Страна">


                        </div>
                    </form>
                    <form class="payment order__form">
                        <h2 class="order__form-title">Способ оплаты</h2>
                        <div class="payment__form order__form-item">

                        </div>
                    </form>

                </div>

                <div class="order__col">
                    <div class="order__form">
                        <h2 class="order__form-title">Итого к оплате</h2>

                        <div class="products">
                        </div>
                        <div class="order__total">
                            <div class="order__total-item">
                                <span>Стоимость</span>
                                <p class="bigger-txt order__total-price"></p>
                            </div>
                            <div class="order__total-item">
                                <span>Скидка</span>
                                <p class="bigger-txt order__sale">0 р.</p>
                            </div>
                            <div class="order__total-item">
                                <span>Всего</span>
                                <p class="bigger-txt order__price-sale"></p>
                            </div>
                        </div>
                    </div>

                    <form class="sale order__form">
                        <div class="sale__form order__form-item">
                            <p class="sale__form-title">Использовать скидку</p>
                            <input class="sale__form-val input" type="text" name="sale" placeholder="Введите код">
                            <button class="btn-white sale__form-btn">Применить</button>
                        </div>
                    </form>

                    <div class="order__btn">
                        <a href="catalog.php" class="order__btn-link btn-white">Вернуться к покупкам</a>
                        <input type="submit" class="order__btn-link btn order__submit" value="Оформить заказ">
                    </div>

                </div>
            </div>

        </section>

    </div>


    <script src="js/basket.js"></script>
    <script src="js/order.js"></script>
</body>
</html>