 //窗口滚动的时候触发
 let iTop = $('#header').height() - 2;
 // console.log(iTop);
 window.onscroll = () => {
     let dis = window.scrollY; //获取滚动距离
     // console.log(dis);
     if(dis >= iTop) {
         $('.aside .p3').css('display','block');
     }else{
         //没有到达临界点
         $('.aside .p3').css('display','none');
     }    
 }

 //划过第一个图片让对应隐藏的二维码出现
 $('.aside .p4').hover( () => {
     //出现
     $('.app').css('display','block');
 }, () => {
     //隐藏
     $('.app').css('display','none');
 });

 //划过第一个图片让对应隐藏的二维码出现
 $('.aside .p2').hover( () => {
    //出现
    $('.weixin').css('display','block');
}, () => {
    //隐藏
    $('.weixin').css('display','none');
});