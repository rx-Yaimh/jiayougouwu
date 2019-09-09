(function() {
    let tel = getCookie('tel');
    function init() {
        // let tel = getCookie('tel');
        // console.log(tel);
        if(tel) {
            let str = `Hi! ` + tel;
            $('.h_u1 #dl').css('display','none');
            $('.h_u1 .dl_xs').css('display','block');
            $('.l_reg #reg').css('display','none');
            $('.l_reg .reg_tc').css('display','block');
            $('.l_dl .dl_xs').html(str);

             //获取某个用户的购物车商品总数量
             let zs = 0;
             $.ajax({
                 type: "post",
                 url: "api/cartNumxs.php",
                 data: {
                     uid : tel
                 },
                 dataType: "json",
                 success: function (str) {
                     str.map(item => {
                         // arr1.push(item.num);    
                         zs += (item.num*1);
                     })
                    //  console.log(zs) //得到总数
                     $('.r_p1 #i_top').text(zs);
                     let a = `购物车 ${zs} 件`;
                     $('.h_u2 .gwc').text(a);
                 }
             });

        }else{
            $('.h_u1 #dl').css('display','block');
            $('.h_u1 .dl_xs').css('display','none');
            $('.l_reg #reg').css('display','block');
            $('.l_reg .reg_tc').css('display','none');
        }
    }
    init();

    //点击退出，删除cookie，状态就从登录中变成登出中，退出后跳转到首页
    $('.h_u1 .reg_tc').click(function () {
        localStorage.url = 'location.href';
        console.log('666')
        removeCookie('tel');
        location.href = '01shouye.html';
        // let str = `请登录 `;
        // $('.h_u1 #dl').html(str);
        // let str1 = `免费注册`;
        // $('.h_u1 #reg').html(str1);
    });


    $('.list li').mouseover(function() {
        let index = $(this).index();
        // console.log(index);
        // console.log($('#b_b_left').find('.con'));
        $('#b_b_left').find('.con').eq(index).show().siblings;
    });

    $('.list li').mouseleave(function() {
        let index = $(this).index();
        // console.log(index);
        // console.log($('#b_b_left').find('.con'));
        $('#b_b_left').find('.con').eq(index).hide();
    });

    // $('#main_list .left').hover(() => {
    //     $('#main_list .left').css('opacity',1);
    // },() => {
    //     $('#main_list .left').css('opacity',0.5);
    // });

    // $('#main_list .right').hover(() => {
    //     $('#main_list .right').css('opacity',1);
    // },() => {
    //     $('#main_list .right').css('opacity',0.5);
    // });

    //划过头部的手机版文字出现隐藏的二维码
    $('#h_top .li_1').hover( () => {
        //出现
        $('.t_app').css('display','block');
    }, () => {
        //隐藏
        $('.t_app').css('display','none');
    });

    //划过头部的微博版文字出现隐藏的二维码
    $('#h_top .li_2').hover( () => {
        //出现
        $('.t_weixin').css('display','block');
        $('.t_shiyanshi').css('display','block');
    }, () => {
        //隐藏
        $('.t_weixin').css('display','none');
        $('.t_shiyanshi').css('display','none');
    });

     //点击免费注册可以跳转到用户注册页面
     $('.h_u1 #reg').click(function() {
        // console.log('lll')
        window.open('html/reg.html');
        // window.open('html/login.html');
    });

    //点击请登录可以跳转到登录页面
    $('.h_u1 #dl').click(function() {
        localStorage.url = location.href;
        // console.log('lll')
        window.open('html/login.html');
    });

    //点击下拉菜单的某个内容跳转到列表页
    $('.menu .list a').click(function () {
        window.open('html/list.html');
        
    });
    
    function indexTocart() {
        if(tel) {
            window.open('html/cart.html');  
        }else{
                confirm('亲，请先登录');
        }
    }
    //点击我的购物车和购物车件跳转到用户对应的购物车页面
    $('.r_p1').click(function () { 
        indexTocart();
     });
     $('.h_u2 .gwc').click(function () { 
        indexTocart();
     });
})();