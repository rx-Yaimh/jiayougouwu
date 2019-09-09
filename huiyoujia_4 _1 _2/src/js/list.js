(function () {
    // localStorage.url = location.href;

    let url = '../api/getlist.php';
    let type = '';
    let order = '';
    let min = 0;
    let max = 0;
    let isok = true;
    let search_con = '';
    // let pages = $('#page'); //页数
    let ipage = 1; //获取第一页数据
    let xssl = 20; //每页显示20条
    let tel = getCookie('tel');
    // let num = 0;

    let init = () => {
       
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
                url: "../api/cartNumxs.php",
                data: {
                    uid : tel
                },
                dataType: "json",
                success: function (str) {
                    str.map(item => {
                        // arr1.push(item.num);    
                        zs += (item.num*1);
                    })
                    // console.log(zs) //得到总数
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
        $.ajax({
            type: "get",
            url: url,
            data: {
                type : type,
                order : order,
                min : min,
                max : max,
                search : search_con,
                page : ipage,
                xssl : xssl
            },
            dataType: "json",
            success: function (str) {
                // console.log(str);
                // sjxr(str);
                let html = str.data.map(item => {
                    // console.log(item);
                    return ` <li data-id="${item.gid}"><a href="###">
                                    <img src="${item.src}" alt="">
                                    <p class="title">${item.title}</p>
                                    <p class="price">￥${item.price}</p>
                                    <p class="sale">月销${item.sale}件</p>
                                </a></li>`;
                }).join('');
                $('.con_list').html(html);

                // //渲染页面
                let total = Math.ceil(str.total / str.xssl);
                // console.log(total);
                let spanstr = '';
                for (let i = 0; i < total; i++) {
                    spanstr += `<a href="###">${i + 1}</a>`;
                }
                $('.yeshu').html(spanstr);  //渲染成功

                let html3 = `共${total}页 到第`
                $('.p1').html(html3);
                // console.log( $('.yeshu a').eq(1));
                $('.yeshu a').eq(ipage - 1).addClass("active2"); 
                let total1 = total -1;
                if(ipage > total1) {
                    ipage = total - 1;
                    $('.nextPage').css('opacity','0.4').css("cursor", "default");
                }else if(ipage <= 1) {
                    ipage = 1;
                    $('.prvePage').css('opacity','0.4').css("cursor", "default");
                }
            }
        });
    }

    init();

    //事件委托：实现翻页效果
    $('.yeshu').on('click','a' ,function () {
        // console.log(111);
        $(this).addClass("active2").siblings().removeClass("active2");
        // console.log($(this).html());
        // console.log($(this));
        ipage = $(this).html();
        // console.log(ipage);
        $('#pageCount').val($(this).html());
        sOPa();
        xOPa();
        init();
    });

    //下一页 
    $('.nextPage').click(function () { 
        ipage++;
     
        $('#pageCount').val(ipage);
        init();      
    });

     //上一页
     $('.prvePage').click(function () { 
        ipage--;
        if(ipage < 1) {
            ipage = 1;
            $('.prvePage').css('opacity','0.4').css("cursor", "default");
        }
        
        // sOPa();
        // xOPa();
        $('#pageCount').val(ipage);
        init();      
    });
   
    function sOPa() {
        if(ipage > 1 && ipage <= 8) {
            $('.prvePage').css('opacity','1').css("cursor", "pointer");
        }
    }
    function xOPa() {
        if(ipage < 8 && ipage >= 1) {
            $('.nextPage').css('opacity','1').css("cursor", "pointer");
        }
    }

    function ys() {
        ipage = 1;
        $('#pageCount').val(ipage);
    }

    //输入页码跳转到对应页
    $('#btnQd').click(function () { 
        ipage = $('#pageCount').val();
        // console.log(ipage);
        if(ipage > 8) {
            ipage = 8;
            $('#pageCount').val(ipage);
        }else if(ipage < 1) {
            ipage = 1;
            $('#pageCount').val(ipage);
        }
        init();
        
    });


    //高亮 -- 点击综合排序处
    $('.l_o_u1 li').click(function () {
        // console.log('666');
        $(this).addClass("active").siblings().removeClass("active");
    });


    //综合排序
    $('.zh').click(function () {
        $('.price b').css('background-position', '0 -5px');
        $('.sale b').css('background-position', '0 -5px');
        $('.rq b').css('background-position', '0 -5px');
        type = '';
        ipage = 1;
        init();
    });


    function px() {
        if (isok) {
            order = 'desc';
            if(type == 'sale_px') {
                $('.sale b').css('background-position', '0 0');
            }else if(type == 'rq_px') {
                $('.rq b').css('background-position', '0 0');
            }else if(type == 'price_px'){
                $('.price b').css('background-position', '0 0');
            }
        } else {
            order = 'asc';
            if(type == 'sale_px') {
                $('.sale b').removeClass('up').addClass('down');         
                $('.sale b').css('background-position', '0 -10px');
            }else if(type == 'rq_px') {
                $('.rq b').removeClass('up').addClass('down');         
                $('.rq b').css('background-position', '0 -10px');
            }else if(type == "price_px"){
                $('.price b').removeClass('up').addClass('down');         
                $('.price b').css('background-position', '0 -10px');
            }
           

        }
        ipage = 1;
        isok = !isok;
    }

    //销量排序
    $('.sale').click(function () {
        $('.price b').css('background-position', '0 -5px');
        $('.rq b').css('background-position', '0 -5px');
        type = 'sale_px';
        ys();
        px();
        init();
    });

    //人气排序
    $('.rq').click(function () {
        $('.sale b').css('background-position', '0 -5px');
        $('.price b').css('background-position', '0 -5px');
        type = 'rq_px';  
        ys();
        px();
        init();
    });


    //价格排序
    $('.price').click(function () {
        $('.sale b').css('background-position', '0 -5px');
        $('.rq b').css('background-position', '0 -5px');
        type = 'price_px';
        ys();
        px();
        init();
    });

    //区间查询
    $('#queding').click(function () {
        // console.log(000)
        ys();
        min = $('#min').val() - 0;
        max = $('#max').val() - 0;
           console.log(min,max);
        if ((min + 1) && max) {
            type = 'qujian';
            init();
        }
    });

    //模糊查询
    $('.search .btn').click(function () {
        // e.preventDefault();
        // console.log('666');
        ys();
       
        search_con = $('.inpcon').val();
        // console.log(_search);
        if (search_con) {
            type = 'search';
            init();
        }else {
            type = '';
            init();
        }

    });

    //点击某个商品跳转到对应的详情，并将商品id(gid)传过去
    $('.con_list').on('click','li', function () {
        let getgid = getCookie('getgid');
        if(getgid) {
            //证明有记录，拼接
            let arr = getgid.split('&');
            // console.log(arr);
        let num =$(this).data('id')
            // let index = arr.indexOf(num);//去重后把最新的插入到末尾
            let index = num;
            // console.log(arr.indexOf(num));
            if(index != -1) {
                // console.log(666)
                arr.splice(index,1);
            }
            arr.push($(this).data('id'));
            let html = arr.join('&');
            // console.log(html)
            // localStorage.getgid = html;
            setCookie('getgid',html,7);
        }else{
            //没有就直接拼接
            // let arr = localStorage.gid.split('&');
            setCookie('getgid',$(this).data('id'),7);
        }

        // console.log('666');
        let str = 'gid=' + $(this).data('id'); //获取到点击某个商品的id
        // console.log(str);
        window.open('xiangqing.html?' + str); //带参跳转到详情页
    });


    $('.h_u1 .sy').click(function() {
        // console.log('lll')
        window.open('../01shouye.html');
        // window.open('html/login.html');
    });

    $('.h_u1 #reg').click(function() {
        // console.log('lll')
        window.open('../html/reg.html');
        // window.open('html/login.html');
    });

    //点击请登录可以跳转到登录页面
    $('.h_u1 #dl').click(function() {
        localStorage.url = location.href;
        // console.log('lll')
        window.open('../html/login.html');
    });

    //点击退出，删除cookie，状态就从登录中变成登出中，退出后跳转到首页
    $('.h_u1 .reg_tc').click(function () {
        localStorage.url = 'location.href';
        // console.log(localStorage.url)
        removeCookie('tel');
        location.href = '../01shouye.html';
    });

    //点击下拉菜单的某个内容跳转到列表页
    $('.menu .list a').click(function () {
        window.open('html/list.html');
        
    });

    function indexTocart() {
        if(tel) {
            window.open('cart.html');  
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