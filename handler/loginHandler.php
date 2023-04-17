<?php

use controller\LoginContr;

require '../controller/LoginContr.php';

$ajax = new LoginContr();

$ajax->login();