<?php
    session_start();
?>
<header>
    <div class="container header__container">
        <nav class="nav">
            <ul class="nav__list">
                <li class="nav__item"><a href="#" class="nav__link">Каталог</a></li>
                <li class="nav__item"><a href="#" class="nav__link">Авторы</a></li>
                <li class="nav__item"><a href="#" class="nav__link">О нас</a></li>
                <li class="nav__item"><a href="" class="nav__link">Контакты</a></li>
            </ul>
        </nav>

        <div class="logo">
            <a href="catalog.php" class="logo__link"><img src="img/svg/logo.svg" alt=""></a>
        </div>
        <div class="func">
            <?php include "search.php"?>
            <div class="func__container">
                <div class="favourites func__item">
                    <?php if(empty($_SESSION["id_user"])) {
                        echo '<a href="login.php" class="fav__link"><img src="img/svg/menu_icon_heart.svg" alt=""></a>';
                    } else {
                        echo '<a href="account.php?route=fav" class="fav__link"><img src="img/svg/menu_icon_heart.svg" alt=""></a>'; //поменять на страницу избранного
                    } ?>
                </div>
                <div class="account func__item">
                    <?php
                        if(empty($_SESSION["id_user"])) {
                            echo '<a href="login.php" class="account__link"> <img src="img/svg/account.svg" alt=""></a>';
                        } else {
                            echo '<a href="account.php?route=data" class="account__link"> <img src="img/svg/account.svg" alt=""></a>';
                    } ?>
                </div>
                <div class="basket func__item">
                    <?php
                    if(empty($_SESSION["id_user"])) {
                        echo '<a href="login.php" class="basket__link"><img src="img/svg/basket.svg" alt=""></a>';
                    } else {
                        echo '<a href="basket.php" class="basket__link"><img src="img/svg/basket.svg" alt=""></a>';
                    } ?>
                </div>
            </div>

        </div>
    </div>
</header>
