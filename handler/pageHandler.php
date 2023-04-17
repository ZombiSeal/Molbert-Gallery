<?php
use controller\PageContr;
require '../controller/PageContr.php';


$ajax = new PageContr();
$ajax->show();