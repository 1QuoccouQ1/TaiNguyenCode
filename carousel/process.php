<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST["title"];
    $content = $_POST["content"];

    // In giá trị nội dung ra màn hình
    echo "Tiêu đề: " . $title . "<br>";
    echo "Nội dung: " . $content;
}
?>
