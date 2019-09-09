let l_lbtS = (opt) => {

    let obj = {
        iw : 1200,
        ih : 300
    }
    Object.assign(obj,opt);

    let box =  document.getElementById(obj.ele);
    // console.log(box);
    let list_div = box.getElementsByClassName('list_div')[0];
    let left = box.getElementsByClassName('left')[0];
    let right = box.getElementsByClassName('right')[0];
    let c_list = box.getElementsByClassName('c_list')[0];
    let liW = list_div.offsetWidth;
    // console.log(liW);

    let num = 0;
    left.onclick = () => {
         //往左移动
        // console.log('666')
        num++;
        // console.log(num)
        let ulLeft = num*liW; //每次需要移动的距离
        if(num >= 3) {
            num = 3;
            ulLeft = num*liW;
            // c_list.style.left = -ulLeft + 'px';  
            startMove(c_list,{
                left :  -ulLeft
            });

        }
        startMove(c_list,{
            left :  -ulLeft
        });

    }
//     });

    right.onclick = () => {
        //往左移动
    // console.log('666')
    num--;
    console.log(num)
    let ulLeft = num*liW; //每次需要移动的距离
    if(num <= 0) {
        num = 0;
        ulLeft = num*liW;
        // c_list.style.left = -ulLeft + 'px';  
        startMove(c_list,{
            left :  -ulLeft
        });
    }
    startMove(c_list,{
        left :  -ulLeft
    });

    }

    left.onmouseover = () => {
        startMove(left,{
            opacity :  '100'
        });
    }
    left.onmouseleave = () => {
        startMove(left,{
            opacity :  '50'
        });
    }

    right.onmouseover = () => {
        startMove(right,{
            opacity :  '100'
        });
    }
    right.onmouseleave = () => {
        startMove(right,{
            opacity :  '50'
        });
    }

}