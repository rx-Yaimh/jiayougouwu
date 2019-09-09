<?php
    include 'conn.php';

    //接收传过来的值
     $type = isset($_REQUEST['type']) ? $_REQUEST['type'] : '';

     if($type == 'sale') {
         $sql = "select * from goodsinf order by $order desc limit 0,20";
     }
  
    //sql语句
    $sql = 'select * from goodsinf limit 0,20';
    
    //执行语句
    $res = $conn->query($sql);
    
    //提取数据
    $data = $res->fetch_all(MYSQLI_ASSOC);

    echo json_encode($data,JSON_UNESCAPED_UNICODE);//把对象转成字符串 

     //4.防止乱码
     $conn->set_charset('utf8');

     //5.关闭连接，防止资源浪费
     $res->close();
     $conn->close();
?>