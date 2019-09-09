<?php
    include 'conn.php';
    $uid = isset($_REQUEST['uid']) ? $_REQUEST['uid'] : '';
    $gid = isset($_REQUEST['gid']) ? $_REQUEST['gid'] : '';
    $num = isset($_REQUEST['num']) ? $_REQUEST['num'] : '';
    $xiaoji = isset($_REQUEST['xiaoji']) ? $_REQUEST['xiaoji'] : '';
    $type = isset($_REQUEST['type']) ? $_REQUEST['type'] : '';

    //sql语句  
    if($type == 'update') {
        $sql = "update cartinf set num = $num,xiaoji = $xiaoji where gid = $gid and uid = '$uid'";
    }else if($type == 'deldh' || $type == 'delchoose'){
        $sql = "delete from cartinf where gid = $gid and uid = '$uid'";
    }else if($type == 'delAll') {
        $sql = "delete from cartinf where gid = $gid ";
    }
    
    //执行语句
    $res = $conn->query($sql);
    // var_dump($res);
    if($res) {
        //修改成功
        echo 'yes';
    }else {
        echo 'no';
    }
   
?>