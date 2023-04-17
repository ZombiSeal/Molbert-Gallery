

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
    <div class="container container_center">
        <div class="register">
            <h1 class="title title_margin">Регистрация</h1>
            <form action="registration.php" method="post" class="register-form form" name="register">

                <div class="form__item">
                    <label for="firstname">Имя</label>
                    <input id="firstname" class="input edit firstname" type="text" name="firstName" placeholder="Введите имя"  value="">
                    <span class="error"></span>
                </div>

                <div class="form__item">
                    <label for="lastname">Фамилия</label>
                    <input id="lastname" class="input edit lastName" type="text" name="lastName" placeholder="Введите фамлию">
                    <span class="error"></span>
                </div>


                <div class="form__item">
                    <label for="email">E-mail</label>
                    <input id="email" class="input edit email" type="text" name="email" placeholder="Введите e-mail">
                    <span class="error"></span>
                </div>


                <div class="form__item">
                    <label for="password">Пароль</label>
                    <input id="password" class="input edit password" type="password" name="password" placeholder="Введите пароль">
                    <span class="error"></span>
                </div>

                <div class="form__item">
                    <label for="repeatPassword">Повторить пароль</label>
                    <input id="repeatPassword" class="repeat-password" type="password" name="passwordRepeat" placeholder="Повторите пароль">
                    <span class="error"></span>
                </div>

                <input class="btn btn_log-size-position" type="submit" value="Зарегистрироваться">



            </form>
            <div class="back">
                <a class="back__link" href="login.php">Войти</a>
                <p>или</p>
                <a class="back__link" href="catalog.php">Продолжить как гость</a>
            </div>
            <div class="bg"></div>
        </div>

    </div>

</body>

<script src="js/register.js" ></script>
</html>