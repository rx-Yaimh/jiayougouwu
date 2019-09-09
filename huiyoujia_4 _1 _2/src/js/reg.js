(function() {
    //注册：非空判断 --> 正则验证 --> 发送ajax请求

    //找节点
    // let tel = $('#tel').val();
    let infs = $('.inf');
    //设置开关
    let istrue1 = false;
    let istrue2 = false;
    let istrue3 = false;
    let istrue4 = false;
    let istrue5 = false;
    //图片验证码
    let imgCodeText = "";
    let imgCode = $('#code');
   
   


    //手机号码验证：：以1开头，第二位必须是3~9的数字，后3-9位是任意数字
    $('#tel').blur(function () { 
        let tel = $('#tel').val();
        if(tel){
            // console.log(111);
            //非空 --> 进行正则验证
            var regTel = /^1[3-9]\d{9}$/;
            var res = regTel.test(tel);
            if(res) {
                //符合规则 --> 发送ajax请求
                $.ajax({
                    type: "post",
                    url: "../api/reg.php",
                    data: {
                        tel : tel,
                        type : 'usertel'
                    },
                    // dataType: "dataType",
                    success: function (str) {
                        if(str == 'yes') {
                            infs[0].innerHTML = '手机号验证通过';
                            infs[0].style.color = '#58bc58';
                            istrue1 = true;
                        }else{
                            infs[0].innerHTML = '该手机号已注册';
                            infs[0].style.color = 'red';
                            istrue1 = false;
                        }
                    }
                });
                
            }else {
                infs[0].innerHTML = '请输入正确的手机号';
                infs[0].style.color = 'red';
                istrue1 = false;
            }
        }
        
    });

    //图片验证
     (new Captcha({ fontSize: 30 })).draw(document.querySelector('#captcha'), r => {
        // console.log(r, '验证码1');
        imgCodeText = r;
        /* 自动触发标签失去焦点的事件 */
        imgCode.trigger("blur");
    });
    imgCode.blur(function(e) {
        let text = $.trim($(this).val());
        let parent = $(this).parents(".form-item");

        if (text.length == 0) {
            parent.addClass("form-group-error");
            infs[1].innerHTML = "验证码不能为空";
        } else if (imgCodeText.toLowerCase() != text.toLowerCase()) {
            parent.addClass("form-group-error");
            // msg.html("验证码不正确！");
            infs[1].innerHTML = "验证码不正确";
            istrue2 = false;
        } else {
            parent.removeClass("form-group-error");
            // msg.html("验证码正确！");
            infs[1].innerHTML= "验证码正确";
            infs[1].style.color = '#58bc58';
            istrue2 = true;
        }
    });

    //设置密码
    $('#paw').blur(function () { 
        let paw = $('#paw').val();
        if(paw){
            //非空 --> 进行正则验证
            var regPaw = /^\S{6,20}$/;
            var res = regPaw.test(paw);
            if(res) {
                //符合规则 --> 发送ajax请求
                infs[2].innerHTML = '密码验证通过';
                infs[2].style.color = '#58bc58';
                istrue3 = true;
            }else {
                infs[2].innerHTML = '请输入正确的密码格式';
                infs[2].style.color = 'red';
                istrue3 = false;
            }
             //确认密码
             $('#pswQr').blur(function (e) { 
                 let pawqr = $('#pswQr').val();
                 // console.log(paw);
                 if(pawqr == paw){ //相同
                     infs[3].innerHTML = '两次密码一样';
                     infs[3].style.color = '#58bc58';
                     istrue4 = true;
                 } else {
                     infs[3].innerHTML = '密码不一致';
                     infs[3].style.color = 'red';
                     istrue4 = false;
                 }
             });
        }
    });

    //短信验证码
 
    $('#yzmBtn').click(function () { 
        console.log('999')
       if(istrue1) {
           $('#yzmBtn').attr('disabled',true);
        //    console.log('666')
        //    let timer = setTimeout(move);
        //    let num1 = $('#code').val();
           $.ajax({
               type: "post",
               url: "../api/duanxin.php",
               data: {
                  userphone : $('#tel').val()
               },
               async : true,
               dataType: "json",
               success: function (str) {
                   console.log(str);
                   let arr = str.phonecode;
                   $('#sjCode').blur(function () { 
                       console.log(arr);
                       let num =  $('#sjCode').val();
                       if(num == arr) {
                        infs[4].innerHTML = '验证通过';
                        infs[4].style.color = '#58bc58';
                        istrue5 = true;
                       }else{
                        infs[4].innerHTML = '验证不通过';
                        infs[4].style.color = 'red';
                        istrue5 = false;
                       }
                       
                   });
               }
           });
       }else{
        infs[4].innerHTML = '请先输入手机号';
        infs[4].style.color = 'red';
       }
        
    });

    //同意协议后才能登录
    
    $('#agree').click(function () { 
        console.log(istrue1,istrue2,istrue3,istrue4);
        if($('#agree').prop('checked')){
            $('#regBtn').css('background','#dc0f50');
            $('.inff').css('display','none');
            //点击注册-- 不存在就可以注册
            $('#regBtn').click(function () { 
                console.log(istrue1,istrue2,istrue3,istrue4,istrue5);
                let tel = $('#tel').val();
                let paw = $('#paw').val();
                // console.log(istrue1,istrue2,istrue3,istrue4);
                // if (istrue1 && istrue2 && istrue3 && istrue4 && istrue5)
                if (istrue1 && istrue2 && istrue3 && istrue4 && istrue5) {
                    ajax({
                        type: 'post',
                        url: '../api/reg.php',
                        data: {
                            tel:tel,
                            paw: paw,
                            type : 'yanzhen'
                        },
                        success: str => {
                            console.log(str);
                            if (str == 'yes') {
                                confirm('注册成功');
                                //注册成功后跳转到登录页面
                                //用localstorage记录当下的url，方便后期登陆成功的时候做判断
                                // localStorage.url = location.href;//获取url存到浏览器
                                location.href = 'login.html';
                            } else {
                                alert('注册失败');
                            }
                        }
                    });
                }
                
            });
        }else{
            $('#regBtn').css('background','#ccc');
            $('.inff').css('display','block');
        }
        
    });
   
    

    //已注册，点击即可跳转到登录页面
    $('.dl').click(function () { 
        location.href = './login.html';  
    });

    $('.h_u1 .sy').children("a").click(function() {
        location.href = '../01shouye.html';
        // window.open("../01shouye.html");
    });

    $('.h_u1 .dl').children("a").click(function() {
        location.href = 'login.html';
        // window.open("../01shouye.html");
    });
})();