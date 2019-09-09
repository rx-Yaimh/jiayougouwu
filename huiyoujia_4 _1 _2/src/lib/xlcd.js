let xlcd = (opt) => {

    //默认参数 -- 可选项
    let obj = ({
        dataFl: ['国产水果', '精选肉类', '禽类蛋品', '海鲜水产', '乳品糕点', '方便速食', '粮油杂货', '食品饮料']
    
    });
    Object.assign(obj,opt);

    //找节点
    let box = document.getElementById('b_b_left');
    // let title = box.getElementsByClassName('title')[0];
    let menu = box.getElementsByClassName('menu')[0];
    let Lis = box.getElementsByClassName('list')[0];
    let con = box.getElementsByClassName('con')[0];
    let dataFl = obj.dataFl;
    // let dataFl = ['国产水果', '精选肉类', '禽类蛋品', '海鲜水产', '乳品糕点', '方便速食', '粮油杂货', '食品饮料'];
    // let dataCon = [
    //     ['新疆小红杏', '四川特芒'],
    //     ['牛排', '羊肉'],
    //     ['鸡', '鸭'],
    //     ['鱼', '贝'],
    //     ['面包'],
    //     ['冷冻点心'],
    //     ['米', '油'],
    //     ['水', '葡萄酒']
    // ];

    //一级控制二级
    // box.onmouseover = () => {
    //     // console.log('666');
    //     menu.style.display = 'block';
    // }
    // box.onmouseout = () => {
    //     menu.style.display = 'none';
    // }

    //二级控制三级
    menu.onmouseover = () => {
        // console.log('666');
        con.style.display = 'block';
    }
    menu.onmouseout = () => {
        con.style.display = 'none';
    }

    //数据渲染
    let html = dataFl.map((time) => {
        return ` <li><a href="">${time}</a></li>`
    }).join('');
    Lis.innerHTML = html;
    // console.log(Lis.children.length);
    //鼠标划入li的时候
    // for (let i = 0; i < Lis.children.length; i++) {
    //     Lis.children[i].onmouseover = () => {
    //         //排他
    //         for (var j = 0; j < Lis.children.length; j++) {
    //             Lis.children[j].className = '';
    //         }
    //         Lis.children[i].className = 'active';
    //         //获得到对应的数据进行拼接渲染三级菜单的标题
           
    //     }
    // }
}