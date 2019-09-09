<?php
    include 'conn.php';

    $uid = isset($_REQUEST['uid']) ? $_REQUEST['uid'] : '';
    $gid = isset($_REQUEST['gid']) ? $_REQUEST['gid'] : '';
    $plcon = isset($_REQUEST['plcon']) ? $_REQUEST['plcon'] : '';
    $type = isset($_REQUEST['type']) ? $_REQUEST['type'] : '';

    //sql语句  
    if($type == 'xuanran') {
        $sql = "select * from plliuyan where gid = $gid order by plTime desc";
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
    }else if($type == 'fabiao') {
        $sql2 = "insert into plliuyan (uid,gid,plcon) value ('$uid',$gid,'$plcon')";
        $res2 = $conn->query($sql2);
        // var_dump($res2);
        if($res2) {
            //添加成功
            echo 'yes';
        }else {
            echo 'no';
        }
    }
    

?>