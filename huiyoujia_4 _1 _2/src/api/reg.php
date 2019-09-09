<?php
    //连接数据库
    include 'conn.php';

    //接收数据
    $tel = isset($_REQUEST['tel']) ? $_REQUEST['tel'] : '';
    $paw = isset($_REQUEST['paw']) ? $_REQUEST['paw'] : '';
    $type = isset($_REQUEST['type']) ? $_REQUEST['type'] : '';
    //写sql语句
    if( $type == 'usertel' || $type == 'userPaw' || $type == 'userdl') { //手机号验证
        if($type == 'usertel') {
            $sql = "select * from userinf where usertel = '$tel'";
        }else if($type == 'userPaw') {
            $sql = "select $paw from userinf where usertel = '$tel' ";
        }else if($type == 'userdl') {
            $sql = "select * from userinf where usertel = '$tel' and password = '$paw';
            ";
        }
        
        $res = $conn->query($sql);

        if($res->num_rows) {
            //查到，不给注册
            echo 'no';
        }else {
            echo 'yes';
        }
    }else if($type == 'yanzhen') { //如果手机号和密码都正确通过验证
        $sql = "insert into userinf (usertel,password) values ('$tel','$paw')";
         //执行语句
        $res = $conn->query($sql);

        if($res) {
            //查到，不给注册
            echo 'yes';
        }else {
            echo 'no'; 
        }
    }



   
?>