(function () {
    /* 
        用户登录：
            * 在用户输入手机号后判断是否输入正确
                 if(正确) {
                     发送ajax请求查询数据库是否存在该用户
                     if(存在){
                         提示：手机号正确
                     }else{
                         提示：该用户不存在
                     }
                 }else{
                     提示：请输入正确的手机号
                 }
                 
            * 用户输入密码也类似
            * 点击登录 --> 要判断是否正在登录中或未登录
                 if(未登录) {
                     //设置cookie
                 }else(登录中) {
                     //不允许重复登录
                 }
    */
    $('.menu .l1').click(function () {
        $('#right .con').css('display', 'block');
        // $('#right .con').css('color','#dc0f50');
        $('#right .l1').children("a").css('color', '#dc0f50');
        $('#right .con1').css('display', 'none');
        $('#right .l2').children("a").css('color', '#666');
        $('#right .l2').children("a").css('border-bottom', 'none');
        $('#right .l1').children("a").css('border-bottom', '2px solid #dc0f50');
    });

    $('.menu .l2').click(function () {
        $('#right .con1').css('display', 'block');
        $('#right .l2').children("a").css('color', '#dc0f50');
        $('#right .con').css('display', 'none');
        $('#right .l1').children("a").css('color', '#666');
        $('#right .l1').children("a").css('border-bottom', 'none')
        $('#right .l2').children("a").css('border-bottom', '2px solid #dc0f50')
    });

    //找节点
    let infs = $('.bk .inf');
    let jk = $('.bk .jk');
    let istrue1 = false;
    let istrue2 = false;
    let istrue3 = false;

    //1.用户登录
    //输入手机号验证
    $('.con #tex').blur(function () {
        //    console.log('666');
        let tel = $('#tex').val();
        if (tel) {
            // console.log(111);
            //非空 --> 进行正则验证
            var regTel = /^1[3-9]\d{9}$/;
            var res = regTel.test(tel);
            if (res) {
                //符合规则 --> 发送ajax请求
                // console.log(66)
                $.ajax({
                    type: "post",
                    url: "../api/reg.php",
                    data: {
                        tel: tel,
                        type: 'usertel'
                    },
                    // dataType: "dataType",
                    success: function (str) {
                        // console.log(str);
                        if (str == 'no') {
                            infs[0].innerHTML = '手机号正确';
                            infs[0].style.color = '#58bc58';
                            istrue1 = true;
                        } else {
                            infs[0].innerHTML = '该手机号未存在';
                            infs[0].style.color = 'red';
                            istrue1 = false;
                        }
                    }
                });

            } else {
                infs[0].innerHTML = '请输入正确的手机号';
                infs[0].style.color = 'red';
                istrue1 = false;
            }
        }

    });

    //密码验证
    $('.con #psw').blur(function () {
        //    console.log('666');
        let paw = $('#psw').val();
        let tel = $('#tex').val();
        if (paw) {
            // console.log(111);
            //非空 --> 进行正则验证
            var regPaw = /^\S{6,20}$/;
            var res = regPaw.test(paw);
            if (res) {
                //符合规则 --> 发送ajax请求
                // console.log(66);
                $.ajax({
                    type: "post",
                    url: "../api/reg.php",
                    data: {
                        paw: paw,
                        tel: tel,
                        type: 'userPaw'
                    },
                    // dataType: "dataType",
                    success: function (str) {
                        // console.log(str);
                        if (str == 'no') {
                            infs[1].innerHTML = '密码正确';
                            infs[1].style.color = '#58bc58';
                            istrue2 = true;
                        } else {
                            infs[1].innerHTML = '请输入手机号或密码';
                            infs[1].style.color = 'red';
                            istrue2 = false;
                        }
                    }
                });

            } else {
                infs[1].innerHTML = '请输入正确的密码';
                infs[1].style.color = 'red';
                istrue2 = false;
            }
        }

    });

    
    //点击登录
    $('.con #loginBtn').click(function () {
        let _paw = $('#psw').val();
        let _tel = $('#tex').val();
        if (_paw && _tel) {
            //非空 --> 发送ajax请求
            $.ajax({
                type: "post",
                url: "../api/reg.php",
                data: {
                    tel: _tel,
                    paw: _paw,
                    type: 'userdl'
                },
                // dataType: "dataType",
                success: function (str) {
                    // console.log(str); //可以
                    if (str == 'no') {
                        //判断是否是登录中，如果不是登录中才设置cookie
                        let oldtel = getCookie('tel');
                        if (oldtel) {
                            //存在
                            confirm('你已登录，不允许重复登录！');
                        } else {
                            //未登录，存cookie
                            if($('.reg #choose').prop('checked')) {
                                setCookie('tel', _tel, 10); 
                            }else{
                                setCookie('tel', _tel); 
                            }
                            // setCookie('tel', _tel, 10); //记录了登录状态
                            let url = localStorage.url; //当前
                            // console.log(url);
                            if (!url) {
                                //注册页面跳转到登录页：登录成功后跳转到首页；或者直接打开登录页
                                location.href = '../01shouye.html';
                            } else {
                                location.href = url;
                            }
                        }
                    } else {
                        confirm('登陆失败');
                    }
                }
            });
        }
    });


    //2.快捷登录

    //图片验证码
    let imgCodeText = "";
    let imgCode = $('#code');
    //图片验证
    (new Captcha({
        fontSize: 25
    })).draw(document.querySelector('#captcha'), r => {
        // console.log(r, '验证码1');
        imgCodeText = r;
        /* 自动触发标签失去焦点的事件 */
        imgCode.trigger("blur");
    });
    imgCode.blur(function (e) {
        let text = $.trim($(this).val());
        let parent = $(this).parents(".form-item");

        if (text.length == 0) {
            parent.addClass("form-group-error");
            jk.html("图片验证码不能为空");
            istrue2 = false;
        } else if (imgCodeText.toLowerCase() != text.toLowerCase()) {
            parent.addClass("form-group-error");
            // msg.html("验证码不正确！");
            jk.html("图片验证码不正确");
            istrue2 = false;
        } else {
            parent.removeClass("form-group-error");
            // msg.html("验证码正确！");
            jk.html("图片验证码正确");
            jk.css('color', '#58bc58');
            istrue2 = true;
        }
    });

    //手机号码验证
    $('.con1 #tex').blur(function () {
        //    console.log('666');
        let tel = $('.con1 #tex').val();
        // console.log(tel);
        if (tel) {
            // console.log(111);
            //非空 --> 进行正则验证
            var regTel = /^1[3-9]\d{9}$/;
            var res = regTel.test(tel);
            if (res) {
                //符合规则 --> 发送ajax请求
                // console.log(66)
                $.ajax({
                    type: "post",
                    url: "../api/reg.php",
                    data: {
                        tel: tel,
                        type: 'usertel'
                    },
                    // dataType: "dataType",
                    success: function (str) {
                        // console.log(str);
                        if (str == 'no') {
                            jk.html('手机号正确');
                            jk.css('color', '#58bc58');
                            istrue1 = true;
                        } else {
                            jk.html('该手机号未存在');
                            jk.css('color', '#red');
                            istrue1 = false;
                        }
                    }
                });

            } else {
                jk.html('请输入正确的手机号');
                jk.css('color', 'red');
                istrue1 = false;
            }
        }

    });

    //手机短信验证码
    $('#getYZM').click(function () {
        console.log('999')
        if (istrue1) {
            $('#getYZM').attr('disabled', true);
            //    console.log('666')
            //    let timer = setTimeout(move);
            //    let num1 = $('#code').val();
            $.ajax({
                type: "post",
                url: "../api/duanxin.php",
                data: {
                    userphone: $('#tex').val()
                },
                async: true,
                dataType: "json",
                success: function (str) {
                    console.log(str);
                    let arr = str.phonecode;
                    $('#sjCode').blur(function () {
                        console.log(arr);
                        let num = $('#sjCode').val();
                        if (num == arr) {
                            jk.html("手机验证码正确");
                            jk.css('color', '#58bc58');
                            istrue3 = true;
                        } else {
                            jk.html("手机验证码不正确");
                            jk.css('color', '#58bc58');
                            istrue3 = false;
                        }

                    });
                }
            });
        } else {
            jk.html("请先输入手机号");
            jk.css('color', 'red');
        }

    });
    //点击登录
    $('.con1 #loginBtn1').click(function () {
        // console.log(istrue1,istrue2);
        if (istrue1 && istrue2 && istrue3) {
            let _tel = $('#tel').val();
            let oldtel = getCookie('tel');
            if (oldtel) {
                //存在
                confirm('你已登录，不允许重复登录！');
            } else {
                //未登录，存cookie
                setCookie('tel', _tel, 10); //记录了登录状态
                let url = localStorage.url; //当前
                // console.log(url);
                if (!url) {
                    //注册页面跳转到登录页：登录成功后跳转到首页；或者直接打开登录页
                    location.href = '../01shouye.html';
                } else {
                    location.href = url;
                }
            }
        } else {
            confirm('登陆失败');
        }
    });

    //点击注册跳转到注册页面
    console.log($('.reg').children("a"));
    $('.reg').children("a").click(function () {
        location.href = 'reg.html';
        // console.log('666');
    });

    // console.log($('.h_u1 .sy').children("a"));
    //点击首页跳转到首页
    $('.h_u1 .sy').children("a").click(function () {
        location.href = '../01shouye.html';
        // window.open("../01shouye.html");
    });

    $('.h_u1 .zc').children("a").click(function () {
        location.href = 'reg.html';
        // window.open("../01shouye.html");
    });

})();