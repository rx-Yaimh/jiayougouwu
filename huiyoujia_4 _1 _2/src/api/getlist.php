<?php
    include 'conn.php';
    
    $type = isset($_REQUEST['type']) ? $_REQUEST['type'] : '';
    $order = isset($_REQUEST['order']) ? $_REQUEST['order'] : 'asc';
    $min = isset($_REQUEST['min']) ? $_REQUEST['min'] : '';
    $max = isset($_REQUEST['max']) ? $_REQUEST['max'] : '';
    $search = isset($_REQUEST['search']) ? $_REQUEST['search'] : '';
    $page = isset($_REQUEST['page']) ? $_REQUEST['page'] : '1';
    $xssl = isset($_REQUEST['xssl']) ? $_REQUEST['xssl'] : '20';

    $index = ($page - 1) * $xssl;
    //sql语句
    if($type == '') {
        $sql = "select * from goodsinf limit $index,$xssl";
    }else if($type == 'sale_px') {
        if($order == 'desc') {
            $sql = "select * from goodsinf order by sale $order limit $index,$xssl";
        }else if($order == 'asc'){
            $sql = "select * from goodsinf order by price $order limit $index,$xssl";
        }
     
    }else if($type =='price_px') {
        if($order == 'desc') {
            $sql = "select * from goodsinf order by price $order limit $index,$xssl";
        }else  if($order == 'asc'){
            $sql = "select * from goodsinf order by price $order limit $index,$xssl";
        }
    }else if($type == 'qujian') {
        $sql = "select * from (select * from goodsinf where price between $min and $max limit $index,$xssl)pagea order by sale desc";
    }else if($type == 'search') {
        $sql = "select * from (select * from goodsinf where title like '%$search%' limit $index,$xssl)pagea order by price desc";
    }else if($type == 'rq_px') {
        if($order == 'desc') {
            $sql = "select * from goodsinf order by kucun $order limit $index,$xssl";
        }else  if($order == 'asc'){
            $sql = "select * from goodsinf order by kucun $order limit $index,$xssl";
        }
    }

    $sql2 = 'select * from goodsinf';
    //执行语句
    $res = $conn->query($sql);
    $res2 = $conn->query($sql2); 

    if(($min + 1 ) && $max) {
        $sql3 = "select * from goodsinf where price between $min and $max";
        $res3 = $conn->query($sql3);  
        $zl = $res3->num_rows;
    }else if($search) {
        $sql3 = "select * from (select * from goodsinf where title like '%$search%')pagea order by sale desc";
        $res3 = $conn->query($sql3);  
        $zl = $res3->num_rows;
    }else{
        $zl = $res2->num_rows;
    }
    // var_dump($res3);
    
    //提取数据
    $arr = $res->fetch_all(MYSQLI_ASSOC);
    $data = array(
        'total' => $zl,
        'data' => $arr,
        'page' => $page,
        'xssl' => $xssl
    );
    // var_dump($data);
    echo json_encode($data,JSON_UNESCAPED_UNICODE);//把对象转成字符串 
   
     //4.防止乱码
     $conn->set_charset('utf8');
   
     //5.关闭连接，防止资源浪费
     $res->close();
     $conn->close();
?>