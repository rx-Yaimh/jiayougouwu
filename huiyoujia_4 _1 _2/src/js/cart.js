(function () {
    /*
        数据渲染：发送ajax请求，获取数据库中cartinf表的对应数据，渲染到页面

        购物车：
            需求：
                * 点击加减可以修改数量和小计
                * 删除当行
                * 全选不选
                * 全删
                
            接口：
                * 渲染数据接口：订单表(详情页点击购买的时候存的数据)
                * 数量加减
                * 删除当行、删除全部
                * 选做：保存总数量和总价格
    */

    function init() {
        let uid = getCookie('tel');
        if (uid) {
            // $('.h_ul #dl').html() = `Hi! &nbsp;` + tel;
            let str = `Hi! ` + uid;
            console.log(str);
            // $('.h_u1 #dl').html(str);
            // $('.h_u1 #dl').css('color','#dc0f50');
            // // con$('.h_u1 #dl').css('color','#dc0f50');
            // let str1 = `退出`;
            // $('.h_u1 #reg').html(str1);
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
                    uid: uid
                },
                dataType: "json",
                success: function (str) {
                    str.map(item => {
                        // arr1.push(item.num);    
                        zs += (item.num * 1);
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
                url: "../api/getcartinf.php",
                data: {
                    uid: uid
                },
                dataType: "json",
                success: function (str) {
                    // console.log(str); //得到数据
                    resolved(str);
                }
            });
        });

        //数据渲染
        getdata.then(function (str) {
            let html = str.map(item => {
                return ` <tr class="cart_con" data-id=${item.gid}>
                            <td class="td_1">
                                <input type="checkbox" class="dx">
                            </td>
                            <td id="sp">
                                <a href="###">
                                    <img src="${item.src}" alt="">
                                    <p class="p_title">${item.title} ${item.color} ${item.styles}</p>
                                    <p class="p2">
                                        <span class="span1">颜色：${item.color}</span>
                                        <br>
                                        <span>款式：${item.styles}</span>
                                    </p>
                                </a>
                            </td>
                            <td class="td_price">
                                <span class="price">${item.price}.00</span>
                            </td>
                            <td class="addcut">
                                <p class="tj">
                                    <span class="cutnum">-</span>
                                    <input type="text" id="buyCount" value="${item.num}">
                                    <span class="addnum">+</span>
                                </p>
                                <p class="xg">限购5件</p>
                            </td>
                            <td class="xj">
                                <span class="xiaoji">${item.xiaoji}.00</span>
                            </td>
                            <td class="cz">
                                <a href="###" class="del">删除</a>
                            </td>
                        </tr>`
            }).join('')
            $('#td').html(html);
            popo();
            delall();
            // qx();
            let type = '';


            function updateinf(gid, num, xj) {
                $.ajax({
                    type: "post",
                    url: "../api/cartupdate.php",
                    data: {
                        uid: uid,
                        gid: gid,
                        num: num,
                        xiaoji: xj,
                        type: type
                    },
                    // dataType: "dataType",
                    success: function (str) {
                        // console.log(str);
                    }
                });
            }
            let kucun = 5;
            // 1.点击加减可以修改数量和小计
            function total(now, num) { //数量和小计的变化 now-点击的元素
                //数量的变化
               
                if (num < 1) {
                    num = 1;
                } else if (num > kucun) {
                    num = kucun;
                    confirm('亲~，库存不足，请联系客服~~~');
                }
                // $('#buyCount').val(num);
                $(now).parent().parent().find('#buyCount').val(num);

                //小计 = 数量 * 单价
                let price = $(now).parent().parent().prev().text();
                // console.log(price);
                let all = (num * price).toFixed(2);
                $(now).parent().parent().next().children().html(all);
                allNum();
            }

            //点击加
            $('#td').on('click', '.addnum', function () {
                // console.log('666')
                let num = $(this).prev().val() - 0;
                let dj = $(this).parent().parent().prev().text(); //单价
                let gid = $(this).parent().parent().parent().data('id'); //商品id
                // console.log(gid)
                num++;
                if (num > kucun) {
                    num = kucun;
                    confirm('亲~，库存不足，请联系客服~~~');
                }
                // console.log(num)
                total($(this), num);
                let xj = num * dj; //小计
                type = 'update';
                updateinf(gid, num, xj);
                window.location.reload();
            });

            //点击减
            $('#td').on('click', '.cutnum', function () {
                let num = $(this).next().val();
                let dj = $(this).parent().parent().prev().text(); //单价
                let gid = $(this).parent().parent().parent().data('id'); //商品id
                num--;
                if (num < 1) {
                    num = 1;
                    confirm('亲，最少要选择一件哦~~~');
                }
                // console.log(num)
                total($(this), num);
                let xj = num * dj; //小计
                type = 'update';
                updateinf(gid, num, xj);
                window.location.reload();
            });

            //手动输入
            $('#td').on('input', '#buyCount', function () {
                let num = $(this).val();
                if (num < 1) {
                    num = 1;
                    confirm('亲，最少要选择一件哦~~~');
                } else if (num > kucun) {
                    num = kucun;
                    confirm('亲~，库存不足，请联系客服~~~');
                }
                total($(this), num);
                let dj = $(this).parent().parent().prev().text(); //单价
                let gid = $(this).parent().parent().parent().data('id'); //商品id
                let xj = num * dj; //小计
                type = 'update';
                updateinf(gid, num, xj);
                window.location.reload();
            });

            //删除当行 集合里面找集合
            $('#td').on('click', '.del', function () {
                let gid = $(this).parent().parent().data('id'); //商品id
                type = 'deldh';
                let ok = confirm('您确定要删除我吗?o(╥﹏╥)o');
                if (ok) {
                    $(this).parent().parent().remove();
                    $.ajax({
                        type: "post",
                        url: "../api/cartupdate.php",
                        data: {
                            uid: uid,
                            gid: gid,
                            type: type
                        },
                        // dataType: "dataType",
                        success: function (str) {
                            console.log(str);
                            window.location.reload();
                        }
                    });
                }
                if ($('#td .addnum').size() == 0) {
                    //没有数据了
                    $('.bottom').css('display', 'none');
                }
                allNum();
            });

            //复选框控制总量和总价
            function checkedArr() {
                let arr = []; //存放勾选复选框的下标
                $('.td_1 input').each(function (index, item) {
                    if ($(item).prop('checked')) {
                        //被勾选了
                        arr.push(index);
                    }
                });
                return arr;
            }

            function allNum() {
                let checkedall = checkedArr(); //返回被勾选的下标数组
                let num = 0; //放商品总数量
                let total = 0; //放总价
                checkedall.forEach(function (item, index) {
                    num += $('#td #buyCount').eq(checkedall[index]).val() * 1; //累加
                    total += $('#td .xiaoji').eq(checkedall[index]).text() * 1;
                });
                $('.b_con_p3 .p3_span2').html(num);
                $('.b_con_p4 .p4_span3').html(total.toFixed(2));

                //控制全选按钮
                let len = $('.td_1 input').length; //商品复选框的个数
                let achecknum = $('.td_1 input:checked').length;
                if (len == achecknum) {
                    //已经全选
                    $('.b_con_p1 input').prop('checked', true);
                } else {
                    $('.b_con_p1 input').prop('checked', false);
                }

            }

            $('#td').on('click', '.td_1 input', function () {
                allNum();
            });

            //全选功能
            $('.b_con_p1 input').click(function () {
                let isok = $('.b_con_p1 input').prop('checked');
                $('.td_1 input').prop('checked', isok);
                allNum();
            });

            //全删：删除被选行
            // popo();

            function popo() {

                $('#td').on('click', '.dx', function () {
                    let gid = $(this).parent().parent().data('id');
                    // console.log(gid)
                    if ($('#td tr .td_1 .dx').is(':checked')) {
                        // console.log(1)
                        //    popo()
                        $('.delChoose').click(function () {
                            // let aa = confirm('您真的要删除我们吗?o(╥﹏╥)o');
                            let checkall = checkedArr().reverse(); //返回被勾选的下标数组
                            type = 'delchoose';
                            // let ok = confirm('您真的要删除我们吗?o(╥﹏╥)o');
                            let ok = 1;
                            if (ok) {
                                checkall.forEach(function (item, index) {
                                    $('#td .cart_con').eq(checkall[index]).remove();
                                    // console.log($('#td .cart_con').eq(checkall[index]));

                                });
                                $.ajax({
                                    type: "post",
                                    url: "../api/cartupdate.php",
                                    data: {
                                        uid: uid,
                                        gid: gid,
                                        type: type
                                    },
                                    // dataType: "dataType",
                                    success: function (str) {
                                        console.log(str);
                                        window.location.reload();
                                    }
                                });
                            }
                            allNum();
                            if ($('#td .addnum').size() == 0) {
                                //没有数据了
                                $('.bottom').css('display', 'none');
                            }
                            allNum();
                        });
                    }
                });
                if ($('#td .addnum').size() == 0) {
                    //没有数据了
                    $('.bottom').css('display', 'none');
                }
  
                // allNum();

            }

            // console.log( $('.b_con_p3 .p3_span2').text(100));

            function delall() {
                $('.delChoose').click(function () {
                    // console.log(uid)
                    // let num = $('table .index1').html();
                    let num = $('#td .cart_con').data('id');
                    // console.log($(num).length);
                    // console.log($('#td .cart_con').length)
                    $('#td .dx').each(function (index, item) {
                        type = 'delAll';
                        // console.log(item)
                        // console.log($(item))
                        if ($(item).prop('checked') == true) {
                            let num1 = $(item).parent().parent().data('id');
                            // console.log(num1);
                            $(this).parent().parent().remove();

                            $.ajax({
                                type: 'get',
                                url: '../api/cartupdate.php',
                                data: {
                                    // uid: uid,
                                    gid: num1,
                                    type: type
                                },
                                success: str => {
                                    console.log(str)
                                    window.location.reload();
                                }
                            });
                        }
                        // console.log(item)
                    });
                })
                if ($('#td .addnum').size() == 0) {
                    //没有数据了
                    $('.bottom').css('display', 'none');
                }

            }

        });



    }

    init();
    $('.h_u1 .sy').click(function () {
        // console.log('lll')
        window.open('../01shouye.html');
        // window.open('html/login.html');
    });

    $('.h_u1 #reg').click(function () {
        // console.log('lll')
        window.open('../html/reg.html');
        // window.open('html/login.html');
    });

    //点击请登录可以跳转到登录页面
    $('.h_u1 #dl').click(function () {
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


})();