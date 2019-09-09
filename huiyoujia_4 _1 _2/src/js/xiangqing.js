(function () {
    //接收从列表页传过来的数据gid
    // localStorage.url = location.href;
    let gid = decodeURI(location.search.slice(1));
    let goodsID = strToObj(gid);
    // console.log(goodsID);
    // console.log(goodsID.gid);
    let id = goodsID.gid - 0;
    let kucun = 0;
    let tel = getCookie('tel');

    //方法二：
    function init() {
        
        if (tel) {
            let str = `Hi! ` + tel;
            console.log(str);
            $('.h_u1 #dl').css('display', 'none');
            $('.h_u1 .dl_xs').css('display', 'block');
            $('.l_reg #reg').css('display', 'none');
            $('.l_reg .reg_tc').css('display', 'block');
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

        } else {
            $('.h_u1 #dl').css('display', 'block');
            $('.h_u1 .dl_xs').css('display', 'none');
            $('.l_reg #reg').css('display', 'block');
            $('.l_reg .reg_tc').css('display', 'none');
        }
        let getdata = new Promise(function (resolved) {
            $.ajax({
                type: "post",
                url: "../api/xqgetinf.php",
                data: {
                    gid: id
                },
                dataType: "json",
                success: function (str) {
                    // console.log(str);
                    resolved(str);
                }
            });
        });

        getdata.then(function (str) {
            let html1 = str.map(item => {
                return ` <li>
                            <img src="${item.src}" alt="" class="img1">
                        </li>
                        <li>
                        <img src="../img/list8_3.jpg" alt="">
                    </li>
                    <li>
                        <img src="../img/list8_4.jpg" alt="">
                    </li>
                    <li>
                        <img src="../img/list8_3.jpg" alt="">
                    </li>
                    <li>
                        <img src="../img/list8_2.jpg" alt="">
                    </li>
                    <li>
                        <img src="../img/list8_3.jpg" alt="">
                    </li>
                    <li>
                        <img src="../img/list8_2.jpg" alt="">
                    </li>
                    <li>
                        <img src="../img/list8_3.jpg" alt="">
                    </li>
                    <li>
                    <img src="../img/list8_2.jpg" alt="">
                </li`
            }).join('');
            $('.img_ul').html(html1);
            let html2 = str.map(item => {
                return ` <img src="${item.src}" alt="">
                <div class="mask" id="mask"></div>>`
            }).join('');
            $('.imgs .main').html(html2);
            // console.log($('.pic'))

            let html5 = str.map(item => {
                return ` <img src="${item.src}" alt="">
                `
            }).join('');
            $('.biger').html(html5);

            let html3 = str.map(item => {
                return `   <h3>${item.title}</h3>
                            <div class="xq">
                                <p class="price">
                                    <span class="span1">￥${item.price}.00</span>
                                    <span class="span2">进入店铺></span>
                                </p>
                                <p class="num">
                                    <span class="span1">商品编号</span>
                                    <span class="span2">7016145803</span>
                                </p>
                                <p class="sale">
                                    <span class="span1">月销</span>
                                    <span class="span2">${item.sale}6件</span>
                                </p>
                                <p class="promotion">
                                    <span class="span1">促销</span>
                                    <span class="span2">特价</span>
                                </p>
                                <p class="color">
                                    <span class="span1">颜色</span>
                                    <span class="c_span3">
                                        <a href="###">1色号</a>
                                        <a href="###">2色号</a>
                                        <a href="###">3色号</a>
                                    </span>
                                </p>
                                <p class="styles">
                                    <span class="span1">款式</span>
                                    <span class="s_span3">
                                        <a href="###">2XL</a>
                                        <a href="###">L</a>
                                        <a href="###">XL</a>
                                    </span>
                                </p>
                                <P class="buynum">
                                    <span class="span1">购买数量</span>
                                    <span>
                                        <a href="###" class="cut">-</a>
                                        <input type="text" id="buycount" value="1">
                                        <a href="###" class="add">+</a>
                                    </span>

                                </P>
                                <p class="list">
                                    <span class="span1">邮</span>
                                    <span class="span2" id="span2">包邮</span>
                                    <span class="span1">正</span>
                                    <span class="span2">正品保障</span>
                                    <span class="span1" id="span3">7</span>
                                    <span class="span2">支持7日无理由退货（需保证商品完好）</span>
                                </p>
                                <div class="btn">
                                    <input type="button" value="加入购物车" id="addcart">
                                    <input type="button" value="立即购买" id="fastBuy">
                                </div>
                            </div>`
            }).join('');
            $('.right').html(html3);

            let sl = 1;
            let num = '1'; //因为在获取购买数量的时候的数据是字符串，所以就直接设置为字符串类型。
            let color_ys = '';
            let styles_ys = '';
            let src = str[0].src;
            let title = str[0].title;
            let price = str[0].price;
            kucun = str[0].kucun;

            //点击+、-改变数量，有上下限
            $('.cut').click(function () {
                //减少
                sl--;
                if (sl <= 1) {
                    sl = 1;
                    $('#buycount').val(sl);
                }
                $('#buycount').val(sl);
                num = $('#buycount').val();
            });

            $('.add').click(function () {
                //添加
                sl++;
                if (sl >= kucun) {
                    sl = kucun;
                    $('#buycount').val(sl);
                }
                $('#buycount').val(sl);
                num = $('#buycount').val();
                // console.log(num)

            });


            $('.c_span3').on('click', 'a', function () {
                $(this).addClass("a_active").siblings().removeClass("a_active");
                color_ys = $(this).html();
                // console.log($(this).html());
            });

            $('.s_span3').on('click', 'a', function () {
                $(this).addClass("a_active").siblings().removeClass("a_active");
                styles_ys = $(this).html();
            });

            // console.log( getCookie('tel')); //保存在cookie的用户名
            let uid = getCookie('tel'); //获取当前的uid
            // console.log(uid)
            //加入购物车
            $('#addcart').click(function () {
                if (uid) {
                    num = $('#buycount').val();
                    let xiaoji = num * price;
                    $.ajax({
                        type: "post",
                        url: "../api/insertcart.php",
                        data: {
                            uid: uid,
                            gid: id,
                            src: src,
                            title: title,
                            price: price,
                            num: num,
                            color: color_ys,
                            styles: styles_ys,
                            xiaoji: xiaoji
                        },
                        // dataType: "json",
                        success: function (str) {
                            // console.log(str);
                            if (str == 'yes') {
                                confirm('亲，你已添加成功，请尽快去购买哦~~~');
                                window.location.reload();
                            }
                        }
                    });
                } else {
                    confirm('亲，请先登录');
                }
                // console.log(uid)
                // num = $('#buycount').val();
                // let xiaoji = num * price;
                // $.ajax({
                //     type: "post",
                //     url: "../api/insertcart.php",
                //     data: {
                //         uid : uid,
                //         gid: id,
                //         src: src,
                //         title: title,
                //         price: price,
                //         num: num,
                //         color: color_ys,
                //         styles: styles_ys,
                //         xiaoji : xiaoji
                //     },
                //     // dataType: "json",
                //     success: function (str) {
                //         // console.log(str);
                //         if (str == 'yes') {
                //             confirm('亲，你已添加成功，请尽快去购买哦~~~');
                //         }
                //     }
                // });

            });

            //立即购买  --- 先让其跳转到购物车页面，到时候写完完整页面再把此处代码复制粘贴到我的购物车处点击
            $('#fastBuy').click(function () {
                // e.preventDefault();
                if (uid) {
                    location.href = 'cart.html';
                } else {
                    confirm('请先登录')
                }
                //跳转到付款页面
                // location.href = 'cart.html';

            });

            $('.xx_list ').on('click', 'a', function () {
                // console.log('6666')
                // $(this).addClass("xx_active").siblings().removeClass("xx_active");

            });
            // console.log( $('#container'))
            $('.goodsxq').click(function () {
                $('.xx_con').css('display', 'block');
                $('.xx_con2').css('display', 'none');
                $('.container').css('display', 'none');
                $('.zj_con').css('display', 'none');
                $(this).addClass("xx_active");
                $('.canshu').removeClass("xx_active");
                $('.pinglun').removeClass("xx_active");
                $('.zuji').removeClass("xx_active");
            });

            $('.canshu').click(function () {
                $('.xx_con').css('display', 'none');
                $('.xx_con2').css('display', 'block');
                $('.container').css('display', 'none');
                $('.zj_con').css('display', 'none');
                $(this).addClass("xx_active");
                $('.goodsxq').removeClass("xx_active");
                $('.pinglun').removeClass("xx_active");
                $('.zuji').removeClass("xx_active");
            });

            $('.pinglun').click(function () {
                // console.log('666')
                $('.container').css('display', 'block');
                $('.xx_con').css('display', 'none');
                $('.xx_con2').css('display', 'none');
                $('.zj_con').css('display', 'none');
                $(this).addClass("xx_active");
                $('.goodsxq').removeClass("xx_active");
                $('.canshu').removeClass("xx_active");
                $('.zuji').removeClass("xx_active");
            });

            $('.zuji').click(function () {
                if (uid) {
                    $('.zj_con').css('display', 'block');
                    $('.container').css('display', 'none');
                    $('.xx_con').css('display', 'none');
                    $('.xx_con2').css('display', 'none');
                    $(this).addClass("xx_active");
                    $('.goodsxq').removeClass("xx_active");
                    $('.canshu').removeClass("xx_active");
                    $('.pinglun').removeClass("xx_active");
                } else {
                    confirm('请先登录')
                }
                // console.log('666')
                // $('.zj_con').css('display','block');
                // $('.container').css('display','none');
                // $('.xx_con').css('display','none');
                // $('.xx_con2').css('display','none');
                // $(this).addClass("xx_active");
                // $('.goodsxq').removeClass("xx_active"); 
                // $('.canshu').removeClass("xx_active");  
                // $('.pinglun').removeClass("xx_active");  

            });

            //评论留言：
            //内容渲染
            let type = '';

            function liuyan() {
                type = "xuanran";
                $.ajax({
                    type: "post",
                    url: "../api/liuyan.php",
                    data: {
                        gid: id,
                        type: type
                    },
                    dataType: "json",
                    success: function (str) {
                        // console.log(str);
                        let html = str.map(item => {
                            return `<dl>
                                        <dt>
                                            <strong>${item.uid}</strong> 说 :
                                        </dt>
                                        <dd class="plnr">评论内容：<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${item.plcon}</p></dd>
                                        <br>
                                        <dd class="shijian">
                                        发布时间：${item.plTime}</dd>
                                      
                                    </dl>`;

                        }).join('');
                        // console.log(html);
                        $('#pl_list').html(html);
                        let dlnum = $('#pl_list dl').size();
                        // console.log(dlnum)
                        let str1 = `关于评论(` + dlnum + `)`;
                        $('.pinglun').text(str1);
                    }
                });
            }

            liuyan();

            //评论留言

            function aa() {
                let uid = getCookie('tel');
                // console.log($('#s_content').val());
                type = "fabiao";
                $.ajax({
                    type: "post",
                    url: "../api/liuyan.php",
                    data: {
                        uid: uid,
                        gid: id,
                        plcon: $('#s_content').val(),
                        type: type
                    },
                    // dataType: "json",
                    success: function (str) {
                        // console.log(str);
                        // sjxr(str);
                    }
                });
                $('#s_content').val('');
            }

            //点击发表评论可以发表
            $('#btnPost').click(function () {
                if (uid) {
                    aa();
                    liuyan();
                } else {
                    confirm('请先登录');
                }


            });

            //点击回车也可以发表
            $('#s_content').keyup(function (e) {
                if (e.keyCode == 13) {
                    aa();

                }
                // return false; 
                liuyan();
            });

            //足迹
            let zuji = getCookie('getgid');
            // console.log(zuji);
            let arr2 = zuji.split('&');
            console.log(arr2);
            arr2.forEach(function (item) {
                $.ajax({
                    type: "get",
                    url: "../api/xqgetinf.php",
                    data: {
                        gid: item
                    },
                    dataType: "json",
                    success: function (str) {
                        // console.log(str); //得到数据 --> 渲染
                        let html = str.map(function (ele) {
                            return `<img src="${ele.src}" alt="">`;
                        }).join('');
                        // console.log(html)
                        $('.zj_con').append(html);
                    }
                });
            })

            //详情页我的购物车处显示该用户的购物车数量
            $.ajax({
                type: "post",
                url: "url",
                data: {
                    uid: uid
                },
                dataType: "json",
                success: function (str) {
                    console.log(str)
                }
            });

            //点击首页跳转到首页
            $('.h_u1 .sy').click(function () {
                // window.open('../01shouye.html');
                location.href = '../01shouye.html';
            });

            //点击登录跳转到登录页
            $('.h_u1 #dl').click(function () {
                localStorage.url = location.href;
                // window.open('../html/login.html');
                location.href = '../html/login.html';
            });

            //点击注册跳转到注册页
            $('.h_u1 #reg').click(function () {
                // window.open('../html/reg.html');
                location.href = '../html/reg.html';
            });

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

            //点击全部商品回到列表页
            $('.bt .allgoods').click(function () {
                // console.log('66')
                location.href = 'list.html';

            });

        });
    }

    init();

    //点击我的购物车和购物车件跳转到用户对应的购物车页面
    $('.r_p1').click(function () { 
        indexTocart();
    });
    $('.h_u2 .gwc').click(function () { 
        indexTocart();
    });




})();