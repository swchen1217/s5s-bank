<?php
//Server
date_default_timezone_set('Asia/Taipei');
header('Content-type: application/json;charset=utf-8');

//Database
define("DB_HOST", "localhost");
define("DB_USER", "s5s");
define("DB_PASS", "s5s-bank");
define("DB_DBNAME", "s5s-bank");
$db = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_DBNAME . ';charset=utf8', DB_USER, DB_PASS);

//Game
$permission = [
    'GET-point' => [
        'token1',
        'token2'
    ],
    'POST-wallet' => [
        'token1',
    ],
    'DELETE-wallet' => [
        'token1',
    ],
    'DELETE-bank' => [
        'token1',
    ],
    'POST-bank' => [
        'token1',
    ],
    'POST-interest' => [
        'token1',
    ],
    'DELETE-interest' => [
        'token1',
    ],
];
$interest = 1.2;