<?php
$body = json_decode(file_get_contents('php://input'), true);
$method = $_SERVER['REQUEST_METHOD'];
$request = array('method' => $method, 'body' => $body);
/*function requestBody($key)
{
    return $request['body'][$key] ?? null;
}

function requestMethod()
{
    return $request['method'] ?? null;
}*/

echo json_encode($request);