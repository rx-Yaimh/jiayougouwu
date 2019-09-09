//轮播图插件开发
function lbt(opt) { //用一个参数(在这指的是对象)来接收传过来的值
    /*
        需求：
            * 自动轮播：开启定时器切换图片
            * 点击左右按钮可以切换图片
            * 点击焦点可以切换对应图片
    */

    //设置一个默认参数 -- 可选项
    let dafaultData = {
        iw: 500, //宽度默认为500px
        ih: 300, //高度默认为300px
    }

    Object.assign(dafaultData, opt); //用默认参数

    //找节点
    let box = document.getElementById(dafaultData.ele);
    let list = box.getElementsByClassName('c_list')[0];
    let prevBtn = box.getElementsByClassName('left')[0];
    let nextBtn = box.getElementsByClassName('right')[0];
    let num = 0; //可视区图片的下标
    // let data = dafaultData.imgdata;

    //宽高的设置
    list.style = box.style = `width:${dafaultData.iw}px;height:${dafaultData.ih}px;`;
    // posibtn.style.width = light.style.width = dafaultData.iw + 'px';
    //渲染li节点
   

    let imglist = list.getElementsByTagName('li');
    // console.log(imglist.length); //15
    let iw = imglist[0].offsetWidth * 5;
    // console.log(iw) //1000

    //全部图片放到右侧，第一张放在可视区
    for (let ele of imglist) {
        ele.style.left = iw + 'px';
        // console.log(ele); //有值
    }
    imglist[0].style.left = 0;

  

    function next() {
        // console.log(666)
        //旧图挪走
        startMove(imglist[num], {
            'left': -iw
        });
        //新图进场
        // num++;
        num+=5;
        // console.log(num);
        num = num > imglist.length - 1 ? 0 : num;
        imglist[num].style.left = iw + 'px'; //确保新图在右侧:候场
        startMove(imglist[num], {
            'left': 0
        });
    }

    function prev() {
        //旧图挪走
        startMove(imglist[num], {
            'left': iw
        });
        //新图进场
        num -= 5;
        num = num < 0 ? imglist.length - 1 : num;
        imglist[num].style.left = -iw + 'px'; //确保新图在右侧:候场
        startMove(imglist[num], {
            'left': 0
        });
    }


    prevBtn.onmouseover = function () {
        // console.log(666)
        prevBtn.style.opacity = 1;
    }
    prevBtn.onmouseout = function () {
        // console.log(666)
        prevBtn.style.opacity = 0.3;
    }

    nextBtn.onmouseover = function () {
        // console.log(666)
        nextBtn.style.opacity = 1;
    }
    nextBtn.onmouseout = function () {
        // console.log(666)
        nextBtn.style.opacity = 0.3;
    }
    prevBtn.onclick = () => {
        // console.log('6666');
        //上一张
        prev();
        // console.log(111)
    }

    nextBtn.onclick = () => {
        //下一张
        // console.log('6666'); //可以点击
        next();
    }
}