<?php
    //设置参数，建立连接 --- 写：主机名、用户名、密码、连接的数据库名称
    $servername  = 'localhost'; //主机名，连接的是warp里面的数据库，因为安装在本地，所以写localhost，上线后可能改为ip
    $username = 'root'; //默认登陆数据库的用户名
    $password = ''; //wamp默认没有密码，phpstudy密码为root
    $dbname = 'jiayougouwu'; //要连接的数据库名称

    //建立连接
    $conn = new mysqli($servername,$username,$password,$dbname);

    //判断是否成功
    // var_dump($conn);
    /*
        js调取属性和方法： arr.lenght  arr.push()
        php调取属性和方法：$conn->属性名   $conn->方法名()
    */
    if($conn->connect_error){
        //有数据返回，就证明失败
        die('连接失败：' . $conn->connect_error);
    }else{
        // echo '连接成功';
    }

?>