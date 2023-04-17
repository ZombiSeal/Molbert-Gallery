<?php
    session_start();
    unset($_SESSION["id_user"]);
    session_destroy();
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
<style>
</style>
<body>
    <div class="container container_center">
        <div class="login">
            <h1 class="title title_margin">Вход</h1>
            <form action="login.php" method="post" class="login-form form">

                <div class="form__item">
                    <label for="log-email">E-mail</label>
                    <input id="log-email" class="input email" type="text" name="email" placeholder="email">
                </div>

                <div class="form__item">
                    <label for="log-password">Пароль</label>
                    <input id="log-password" class="input password" type="password" name="password" placeholder="password">
                </div>


                <span class="error login-err"></span>

                <input class="btn btn_log-size" type="submit" value="Войти">

            </form>
            <div class="back">
                <a class="back__link" href="registration.php">Зарегистрироваться</a>
                <p>или</p>
                <a class="back__link" href="catalog.php">Продолжить как гость</a>
            </div>
            <div class="bg"></div>

        </div>

    </div>
</body>

<script src="js/login.js" ></script>
</html>
