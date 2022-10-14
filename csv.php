<?php
echo '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">';
$Area = $_POST["Area"];
$data = file_get_contents('https://data.ntpc.gov.tw/api/datasets/71CD1490-A2DF-4198-BEF1-318479775E8A/csv?page=0&size=1000');
$rows = explode("\n", $data);
$s = array();
$num = 0;

foreach ($rows as $row) {
    $s[] = str_getcsv($row);
    $num++;
}
$tag = 1;
if ($Area != "請選擇場站區域") {
    print("<table style='border: 5px black double'>");
    print("<tr><td width='92'>場站區域</td><td width='252'>場站名稱</td><td></td></tr>");
}
for ($i = 1; $i < $num - 1; $i++) {
    $name = $s[$i][1];
    $area = $s[$i][4];
    $lng = $s[$i][7];
    $lat = $s[$i][6];
    if ($area == $Area) {
        print("<tr><td width='92'>$Area</td><td width='252'>$name</td><td width='30'><input type='button',id='button', onclick='display($i),displaygooglemap($lng,$lat)', style='width:30;height:30px;font-weight:bold;border:5px black double', value = '選擇'></input></td></tr>");
        $tag++;
    }
}
print("</table>");
