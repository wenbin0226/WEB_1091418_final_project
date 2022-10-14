<?php
$Record = $_POST["Record"];
$data = file_get_contents('https://data.ntpc.gov.tw/api/datasets/71CD1490-A2DF-4198-BEF1-318479775E8A/csv?page=0&size=1000');
$rows = explode("\n", $data);
$s = array();
$num = 0;

foreach ($rows as $row) {
    $s[] = str_getcsv($row);
    $num++;
}

$name = $s[$Record][1];
$total = $s[$Record][2];
$available = $s[$Record][3];
$area = $s[$Record][4];
$address = $s[$Record][8];
$space = $s[$Record][12];
$lng = $s[$Record][7];
$lat = $s[$Record][6];
printf($total . "," . $available . "," . $space . "," . $area . "," . $name . "," . $lng . "," . $lat);
