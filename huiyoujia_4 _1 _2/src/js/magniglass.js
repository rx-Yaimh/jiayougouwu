/*
    需求：实现放大镜功能
        * 渲染数据到页面
        * 经过原图：出现大图可视区和遮罩
        * 在原图区域滑动，遮罩跟着鼠标移动（坐标应该放置在遮罩中间位置、临界值设置）
        * 遮罩运动过程，计算比例系数，让大图跟着运动（最大运动距离 * 比例系数）
        * 移出原图：隐藏大图可视区和遮罩
        * 点击小图切换大图
        * 点击左右按钮可以切换小图位置
    
    插件制作：
        * 为了以后复用和数据的修改，把程序封装好，做成插件，以后方便调用
        * 复用性：把核心代码全部封装
            * id只写在最外层
        * 灵活性：obj对象设置参数
            * 图片不同
            * 放大比例：大图
            * 运动小图步长
            
    
*/

function extend(obj1, obj2) {
    for (var key in obj1) {
        obj2[key] = obj1[key];
    }
}

function magniglass(opt) {
    //默认参数
    var defaultopt = {
        scal: 2,
        speed: 1
    }

    extend(opt, defaultopt); //用默认参数
    //找节点
    var wrap = document.getElementById(defaultopt.ele);
    var main = wrap.getElementsByClassName('main')[0]; //原图
    var biger = wrap.getElementsByClassName('biger')[0]; //大图
    var smaller = wrap.getElementsByClassName('img_ul')[0]; //大图

    //2.经过原图：出现大图可视区和遮罩
    var mask = wrap.getElementsByClassName('mask')[0]; //遮罩
    $('.main').mouseover(function () {
        $('.mask').css('display', 'block');
        $('.biger').css('display', 'block');
    });

    $('.main').mouseleave(function () {
        $('.mask').css('display', 'none');
        $('.biger').css('display', 'none');
    });
    //3.在原图区域滑动，遮罩跟着鼠标移动（坐标应该放置在遮罩中间位置、临界值设置）
    main.onmousemove = function (ev) {
        var left = ev.pageX - wrap.offsetLeft - $('.mask').width() / 2;
        var top = ev.pageY - wrap.offsetTop - $('.mask').height() / 2;
        if (left <= 0) { //临界值设置
            left = 0;
        } else if (left >= $('.main').width() - $('.mask').width()) {
            left = $('.main').width() - $('.mask').width();
        }

        if (top <= 0) { //临界值设置
            top = 0;
        } else if (top >= $('.main').height() - $('.mask').height()) {
            top = $('.main').height() - $('.mask').height();
        }

        //方法一：大图运动：最大运动距离 * 水平或垂直的比例系数(适用于矩形)
        var scalx = left / ($('.main').width() - $('.mask').width());
        var scaly = top / ($('.main').height() - $('.mask').height());
        $('.biger img').css('left', ($('.biger').width() - $('.biger img').width()) * scalx).css('top', ($('.biger').height() - $('.biger img').height()) * scaly);

        //遮罩运动
        //方法一：求比例系数，乘以遮罩的left和top(适用于正方形)
        $('.mask').css('left', left).css('top', top);

    }

    //4.点击小图切换大图:利用事件委托
    smaller.onclick = function (ev) {
        if (ev.target.tagName.toLowerCase() == 'img') {
            // console.log(ev.target);
            var src = ev.target.src;
            main.children[0].src = biger.children[0].src = src;

        }
    }

    //5.点击左右按钮可以切换小图位置
    let num12 = $('.imglist ul li').outerHeight(); //li宽度
    let yyy = 1;
    let left = 0;

    function intu(spp) {
        let num33 = num12 * spp
        left += num33;
        if (left >= 0) {
            left = 0
        } else if (left <= -$('.imglist').outerHeight() + num12 * 3) {
            left = -$('.imglist').outerHeight() + num12 * 3;
        }
        $('.imglist ul').animate({
            'top': left
        }, 300);
    };

    //上一张
    $('.up').click(function () {
        intu(-yyy)
    });

    //下一张
    $('.down').click(function () {
        intu(yyy)
    });
}