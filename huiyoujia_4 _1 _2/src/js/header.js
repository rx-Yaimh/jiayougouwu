$('#b_b_left').hover(() => {
    $('.menu .list').show();
},() => {
    $('.menu .list').hide();
});

$('.list li').mouseleave(function() {
    let index = $(this).index();
    // console.log(index);
    // console.log($('#b_b_left').find('.con'));
    $('#b_b_left').find('.con').eq(index).hide();
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

    $('#main_list .left').hover(() => {
        $('#main_list .left').css('opacity',1);
    },() => {
        $('#main_list .left').css('opacity',0.5);
    });

    $('#main_list .right').hover(() => {
        $('#main_list .right').css('opacity',1);
    },() => {
        $('#main_list .right').css('opacity',0.5);
    });

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
    });

    //点击请登录可以跳转到登录页面
    $('.h_u1 #dl').click(function() {
        // console.log('lll')
        window.open('html/login.html');
    });