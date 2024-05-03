<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');

if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        // may also be using PUT, PATCH, HEAD etc
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
    header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    $centertext = "Get Ready For Flight\n\n";

    while(true){
        echo $centertext;
        sleep(3);

        $centertext = "None\n\n";
        echo $centertext;
        sleep(mt_rand(5, 30));

        $centertext = "The plane flew away\n\n";
        echo $centertext;
        sleep(4);

        $centertext = "Get Ready For Flight\n\n";
    }
?>