(function () {
    //找节点
    // var box = document.querySelector('#box');
    // var ul = box.children[0];
    // var con = box.children[1];
    // var btn = box.children[2];
    // var status = box.children[3];
    // let box = $('.jqr_com');
    // let ul = $('.jqr_com').children();
    // let con = $('.jqr_com').children().next();

    //机器人问答内容准备：与我方的关键字有关
    var qarr = ['你好', '在吗', '你在干嘛呢','你好傻', '你是谁'];
    var aarr = ['您好！家有购物很高兴为您服务！请问有什么可以帮您？', '在的哦~~，亲，请问有什么可以帮助您的吗？','在想你呀', '小艾很可爱', '我是最可爱的小艾'];

    //点击或或者的时候，获取内容
    function creatLi() {
        //我方
        var val = $('.inp_con').val();
        // console.log(val)
        if (val) {
            //非空，就创建节点
            var qLi = $(' <li></li>');
            // console.log(qLi)
            // var qLi = document.createElement('li');
            // qLi.className = 'jqr_active'; //class名
            qLi.addClass("jqr_active");
            qLi.html(val);
            // qLi.innerHTML = val; //渲染
            $('.jqr_list').append(qLi);
            // ul.appendChild(qLi);
            // status.style.display = 'block';
            $('.status').css('display','block');

            //清空聚焦
            // con.value = '';
            // con.focus();
            $('.inp_con').val('');
            $('.inp_con').focus();


            //机器人
            setTimeout(function () {
                // status.style.display = 'none';
                $('.status').css('display','none');
                // var aLi = document.createElement('li'); //创建节点
                var aLi = $(' <li></li>');
                // console.log(aLi);
                var html = ''; //回复的内容
                // console.log(html)
                // console.log(qarr.indexOf(val));
                if (qarr.indexOf(val) != -1) {
                    //有对应的内容
                    html = aarr[qarr.indexOf(val)];
                    // console.log('ooo');
                    // console.log(html)
                } else {
                    //没有对应的内容
                    html = '小艾比较笨，不知道你在说什么~请联系人工客服';
                }
                // aLi.innerHTML = html;
                aLi.html(html);
                // console.log(html)
                // ul.appendChild(aLi);
                $('.jqr_list').append(aLi);
                $('.jqr_list').scrollTop =  $('.jqr_list').scrollHeight - $('.jqr_list').height();
                // ul.scrollTop = ul.scrollHeight - ul.offsetHeight - 2;
            }, 2000);
            // ul.scrollTop = ul.scrollHeight - ul.offsetHeight - 2;
            $('.jqr_list').scrollTop =  $('.jqr_list').scrollHeight - $('.jqr_list').height();
        } else {
            alert('请输入内容！');
        }
    }
    
            //1.点击的时候
            $('#btnTj').click(function () { 
                creatLi();
                
            });

            //2.回车的时候
            $('.inp_con').keydown(function (e) { 
                if(e.keyCode == 13) {
                    // ev.preventDefault();  //阻止默认行为
                    creatLi();
                }
                return false; //阻止默认行为
            });

            $('.kefu').click(function () { 
                // console.log('666')
                $('.jiqiren').css('display','block');
                
            });


            //3.点击关闭按钮可以关掉弹窗
            $('.j_top .xx').click(function () { 
                $('.jiqiren').css('display','none');
                
            });

            //按下Esc也可以关闭弹窗
            document.onkeydown = function (ev) {
                if (ev.keyCode == 27) { //按下ESC键可以关闭弹窗
                    $('.jiqiren').css('display','none');
                }
            }

})();