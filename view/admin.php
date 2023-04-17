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
    <div class="container admin-container">
        <section class="admin">
            <h1 class="title">Андминпанель</h1>
            <div class="user-account__body">
                <nav class="user-account__nav">
                    <ul class="user-account__list">
                        <li class="user-account__item"><a href="admin.php?route=users" data-href="data" class="user-account__link user-account__link_data">Пользователи</a></li>
                        <li class="user-account__item"><a href="admin.php?route=products" data-href="fav"  class="user-account__link user-account__link_products">Картины</a></li>
                        <li class="user-account__item"><a href="admin.php?route=authers" data-href="fav"  class="user-account__link user-account__link_authers">Авторы</a></li>
                        <li class="user-account__item"><a href="admin.php?route=orders" data-href="order" class="user-account__link user-account__link_order">Заказы</a></li>
                        <li class="user-account__item"><a href="admin.php?route=sales" data-href="fav"  class="user-account__link user-account__link_sales">Скидки</a></li>
                        <li class="user-account__item"><a href="login.php" data-href="exit"   data-page="exit" class="user-account__link user-account__link_exit">Выйти</a></li>
                    </ul>
                </nav>
                <div class="user-account__info admin__info">
                </div>
            </div>
        </section>
    </div>
    <script src="js/admin.js"></script>
</body>


</html>
