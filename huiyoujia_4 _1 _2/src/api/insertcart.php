<?php
    include 'conn.php';
    /* 
        添加商品进入购物车：有两种情况
            * 第一种：第一次添加该商品 --- 插入数据
            * 第二种：购物车中已存在该商品 --- 修改(更新)数据
    */
    $uid = isset($_REQUEST['uid']) ? $_REQUEST['uid'] : '13471876602';
    $gid = isset($_REQUEST['gid']) ? $_REQUEST['gid'] : '2';
    $src = isset($_REQUEST['src']) ? $_REQUEST['src'] : '';
    $title = isset($_REQUEST['title']) ? $_REQUEST['title'] : '';
    $price = isset($_REQUEST['price']) ? $_REQUEST['price'] : '';
    $num = isset($_REQUEST['num']) ? $_REQUEST['num'] : '10';
    $color = isset($_REQUEST['color']) ? $_REQUEST['color'] : '';
    $styles = isset($_REQUEST['styles']) ? $_REQUEST['styles'] : '';
    $xiaoji = isset($_REQUEST['xiaoji']) ? $_REQUEST['xiaoji'] : '1200';

    //先查询数据库该用户是否已添加了该商品
    $sql1 = "select * from cartinf where gid = $gid and uid = '$uid'";
    $res1 = $conn->query($sql1);
    // var_dump($res1);
    if($res1->num_rows == 0) { //不存在 --> 插入数据
        $sql2 = "insert into cartinf (uid,gid,src,title,color,styles,price,num,xiaoji) value ('$uid',$gid,'$src','$title','$color','$styles',$price,$num,$xiaoji)";
    }else if($res1->num_rows == 1) { //存在 --> 修改数据
        $sql2 = "update cartinf set num = $num,xiaoji = $xiaoji where gid = $gid and uid = '$uid'";
    }
    // //执行语句
    $res2 = $conn->query($sql2);
    // var_dump($res2);
    if($res2) {
        //添加成功
        echo 'yes';
    }else {
        echo 'no';
    }
   
?>