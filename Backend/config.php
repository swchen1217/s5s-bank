<?php
//Server
date_default_timezone_set('Asia/Taipei');
header('Content-type: application/json;charset=utf-8');

//Database
define("DB_HOST", "localhost");
define("DB_USER", "USER");
define("DB_PASS", "PASSWORD");
define("DB_DBNAME", "DB");
$db = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_DBNAME . ';charset=utf8', DB_USER, DB_PASS);

//Game
$permission = [
    'POST-point' => [
        'token1',
    ],
    'POST-point-1' => [
        'token1',
    ],
    'POST-point-2' => [
        'token1',
    ],
    'POST-point-3' => [
        'token1',
    ],
    'POST-point-4' => [
        'token1',
    ],
    'POST-point-5' => [
        'token1',
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