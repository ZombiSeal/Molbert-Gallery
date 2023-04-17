<?php

namespace controller;
use model\Page;
require  '../model/Page.php';
class PageContr
{
    private Page $page;
    public function __construct()
    {
        $this->page = new Page();
    }

    public function show() {
        $result = $this->page->showPage($_GET["?page"]);
        echo json_encode($result[0]);
    }



}