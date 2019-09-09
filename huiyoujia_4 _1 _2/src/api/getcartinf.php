<?php
    include 'conn.php';
    
    $uid = isset($_REQUEST['uid']) ? $_REQUEST['uid'] : '';
    //缺少uid
    
    //sql语句  
    $sql = "select * from cartinf where uid = '$uid'";
    //执行语句
    $res = $conn->query($sql);

    //提取数据
    $data = $res->fetch_all(MYSQLI_ASSOC);
    
    // var_dump($data);
    echo json_encode($data,JSON_UNESCAPED_UNICODE);//把对象转成字符串 
   
     //4.防止乱码
     $conn->set_charset('utf8');
   
     //5.关闭连接，防止资源浪费
     $res->close();
     $conn->close();
?>