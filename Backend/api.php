<?php

require("config.php");
//require("request.php");

$body = json_decode(file_get_contents('php://input'), true);
$method = $_SERVER['REQUEST_METHOD'];
$request = array('method' => $method, 'body' => $body);

//echo json_encode($request);

if ($request['body'] == null || ($request['body']['cmd'] ?? null) == '') {
    echo json_encode(['success' => true]);
    exit;
}

$cmd = $request['body']['cmd'] ?? null;
$token = $request['body']['token'] ?? null;
$req = $request['method'] . '-' . $request['body']['cmd'];

if (!isset($permission[$req])) {
    http_response_code(400);
    echo json_encode(['error' => 'cmd-error']);
    exit;
} elseif (!in_array($token, $permission[$req])) {
    http_response_code(403);
    echo json_encode(['error' => 'permission-error']);
    exit;
}

$data = $request['body']['data'] ?? null;
$id = $request['body']['id'] ?? null;
$point = $request['body']['point'] ?? null;
if ($point < 0)
    numberError();

if ($request['method'] == 'GET' && $cmd == 'point') {
    $sql = 'SELECT * FROM `points` WHERE 1=1';
    $rs = $db->prepare($sql);
    $rs->execute();
    $ToJson = array();
    while ($row = $rs->fetch(PDO::FETCH_ASSOC)) {
        $ToJson[] = $row;
    }
    echo json_encode($ToJson);
    exit;
}

if ($request['method'] == 'POST' && $cmd == 'wallet') {
    $mPoint = getPoint($db, $id);
    $mPoint['wallet'] += $point;
    setPoint($db, $id, $mPoint['wallet'], $mPoint['bank']);
    echo json_encode($mPoint);
    exit;
}

if ($request['method'] == 'DELETE' && $cmd == 'wallet') {
    $mPoint = getPoint($db, $id);
    if ($mPoint['wallet'] - $point < 0)
        numberError();
    $mPoint['wallet'] -= $point;
    setPoint($db, $id, $mPoint['wallet'], $mPoint['bank']);
    echo json_encode($mPoint);
    exit;
}

if ($request['method'] == 'POST' && $cmd == 'bank') {
    $mPoint = getPoint($db, $id);
    if ($mPoint['wallet'] - $point < 0)
        numberError();
    $mPoint['wallet'] -= $point;
    $mPoint['bank'] += $point;
    setPoint($db, $id, $mPoint['wallet'], $mPoint['bank']);
    echo json_encode($mPoint);
    exit;
}

if ($request['method'] == 'DELETE' && $cmd == 'bank') {
    $mPoint = getPoint($db, $id);
    if ($mPoint['bank'] - $point < 0)
        numberError();
    $mPoint['bank'] -= $point;
    $mPoint['wallet'] += $point;
    setPoint($db, $id, $mPoint['wallet'], $mPoint['bank']);
    echo json_encode($mPoint);
    exit;
}

if ($request['method'] == 'POST' && $cmd == 'interest') {
    $sql = 'SELECT * FROM `points` WHERE 1=1';
    $rs = $db->prepare($sql);
    $rs->execute();
    $rows = array();
    while ($row = $rs->fetch(PDO::FETCH_ASSOC)) {
        $row['bank'] = round($row['bank'] * $interest);
        setPoint($db, $row['id'], $row['wallet'], $row['bank']);
        $rows[] = $row;
    }
    echo json_encode($rows);
    exit;
}

if ($request['method'] == 'DELETE' && $cmd == 'interest') {
    $sql = 'SELECT * FROM `points` WHERE 1=1';
    $rs = $db->prepare($sql);
    $rs->execute();
    $rows = array();
    while ($row = $rs->fetch(PDO::FETCH_ASSOC)) {
        $row['bank'] = round($row['bank'] / $interest);
        setPoint($db, $row['id'], $row['wallet'], $row['bank']);
        $rows[] = $row;
    }
    echo json_encode($rows);
    exit;
}

function getPoint($mDB, $mId)
{
    $sqlS = 'SELECT * FROM `points` WHERE id=:id';
    $rsS = $mDB->prepare($sqlS);
    $rsS->bindValue(':id', $mId, PDO::PARAM_STR);
    $rsS->execute();
    $row = $rsS->fetch(PDO::FETCH_ASSOC);
    foreach ($row as $key => $value) {
        $row[$key] += 0;
    }
    return $row;
}

function setPoint($mDB, $mId, $mWallet, $mBank)
{
    $sqlU = 'UPDATE `points` SET `wallet`=:wallet,`bank`=:bank WHERE id=:id';
    $rsU = $mDB->prepare($sqlU);
    $rsU->bindValue(':wallet', $mWallet, PDO::PARAM_STR);
    $rsU->bindValue(':bank', $mBank, PDO::PARAM_STR);
    $rsU->bindValue(':id', $mId, PDO::PARAM_STR);
    $rsU->execute();
}

function numberError()
{
    http_response_code(400);
    echo json_encode(['error' => 'number-error']);
    exit;
}
