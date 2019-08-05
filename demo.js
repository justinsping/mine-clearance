// 动态生成100个小格  》》》  100 div
// 扫雷的逻辑梳理  leftclick   rigthclick 

// dom 绑定
var startBtn = document.getElementById('btn');
var oBox = document.getElementById('box');
var flagBox = document.getElementById('flagBox');
var alertBox = document.getElementById('alertBox');
var alertImg = document.getElementById('alertImg');
var closeBtn = document.getElementById('close');
var score = document.getElementById('score');
var mineNum;
var mineOver;
var block;
var mineMap = [];


bindEvent();

function bindEvent() {
    startBtn.onclick = function () {
        oBox.style.display = 'block';
        flagBox.style.display = 'block';
        oBox.innerHTML = '';
        init();
    };
    oBox.oncontextmenu = function () {
        return false;
    };
    // 添加鼠标事件
    oBox.onmousedown = function (e) {
        var event = e.target;
        // console.log(e);
        if (e.which == 1) {
            leftClick(event)
        } else if (e.which == 3) {
            // 标记旗子
            rightClick(event);
        }
    };
    closeBtn.onclick = function () {
        alertBox.style.display = 'none';
        flagBox.style.display = 'none';
        oBox.style.display = 'none';
        oBox.innerHTML = '';
    }
}

function init() {
    mineNum = 10;
    mineOver = 10;
    score.innerHTML = mineOver;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var item = document.createElement('div');
            item.classList.add('block');
            item.setAttribute('id', i + '-' + j);
            oBox.appendChild(item);
            mineMap.push({ mine: 0 });
        }
    }
    // 100个小格
    block = document.getElementsByClassName('block');

    while (mineNum) {
        // 生成0-100的随机数据
        var mineIndex = Math.floor(Math.random() * 100);
        // 为了不重复放雷
        if (mineMap[mineIndex].mine === 0) {
            mineMap[mineIndex] = 1;
            // 随机在100个小格选择10个格进行放雷
            block[mineIndex].classList.add('islei');
            mineNum--;
        }

    }

}

function leftClick(dom) {
    if(dom.classList.contains('flag')) {
        return;
    }
    var isLei = document.getElementsByClassName('islei');
    // 首先判断 点击的小格是否是 ‘islei'
    // console.log(dom) 打印的是点击的dom所有元素
    if (dom && dom.classList.contains('islei')) {
        // 游戏结束 所以的雷显示出来
        for (var i = 0; i < isLei.length; i++) {
            isLei[i].classList.add('show');
        }
        setTimeout(function () {
            alertBox.style.display = 'block';
            alertImg.style.backgroundImage = 'url("./img/over.jpg")'
        }, 800)
    } else {
        var n = 0;
        var posArr = dom && dom.getAttribute('id').split('-');
        var posX = posArr && +posArr[0];
        var posY = posArr && +posArr[1];
        dom && dom.classList.add('num');
        // 判读 i  小格 周围8个小格中是否有含有 “islei" 的
        for (var i = posX - 1; i <= posX + 1; i++) {
            for (var j = posY - 1; j <= posY + 1; j++) {
                var aroundBox = document.getElementById(i + '-' + j);
                if (aroundBox && aroundBox.classList.contains('islei')) {
                    n++;
                }
            }
        }
        dom && (dom.innerHTML = n);
        // 扩散
        if (n == 0) {
            for (var i = posX - 1; i <= posX + 1; i++) {
                for (var j = posY - 1; j <= posY + 1; j++) {
                    var nearBox = document.getElementById(i + '-' + j);
                    if(nearBox &&　nearBox.length != 0) {
                        if(!nearBox.classList.contains('check')) {
                            nearBox.classList.add('check');
                            leftClick(nearBox);
                        }
                    }
                }
            }
        }
    }
}

function rightClick(dom) {
    if(dom.classList.contains('num')) {
        return;
    }
    dom.classList.toggle('flag');
    if(dom.classList.contains('islei') &&　dom.classList.contains('flag')) {
        mineOver --;
    }
    if(dom.classList.contains('islei') &&　!dom.classList.contains('flag')) {
        mineOver ++;
    }
    if(mineOver == 0) {
        alertBox.style.display = 'block';
        alertImg.style.backgroundImage = 'url("./img/success.png")';
    }
    score.innerHTML = mineOver;
}