var defaultConfig = {
    model: {
        // jsonPath: "https://cdn.jsdelivr.net/gh/evrstr/live2d-widget-models/live2d_evrstr/aoba/model.json",
        jsonPath: "https://cdn.jsdelivr.net/gh/evrstr/live2d-widget-models/live2d_evrstr/koharu/model.json",
        scale: 1,
    },
    display: {
        superSample: 2,
        width: 200,
        height: 400,
        position: 'right',
        hOffset: 0,
        vOffset: -20,
    },
    mobile: {
        show: true,
        scale: 0.8,
        motion: true,
    },
    name: {
        canvas: 'live2dcanvas',
        div: 'live2d-widget',
    },
    react: {
        opacity: 1,
    },
    dev: {
        border: false
    },
    dialog: {
        enable: false,
        hitokoto: false
    },

}
L2Dwidget.init(defaultConfig);


var create_card = function(name, preview, json) {
    var content = document.getElementById("content");
    var div = document.createElement("div");
    div.className = "card";
    div.id = name;
    div.name = name;
    var a_1 = document.createElement("a");
    var img = document.createElement("img");
    // img.src = preview;
    img.src = "https://cdn.jsdelivr.net/gh/evrstr/img/blog_evrstr/loading.gif";
    img.dataset.src = preview;
    img.alt = name;
    img.className = "card_img"
    a_1.appendChild(img);
    div.appendChild(a_1);

    var div2 = document.createElement("div");
    div2.className = "item";
    var h2 = document.createElement("h2");
    h2.className = "item_title";
    h2.innerHTML = "<a>" + name + "</a>";
    div2.appendChild(h2);


    div3 = document.createElement("div");
    div3.className = "item_tag";
    span = document.createElement("span")
    span.innerText = name;
    div3.appendChild(span)
    div2.appendChild(div3)
    div.appendChild(div2)

    content.appendChild(div);
    checkImgs();
    h2.onclick = function() {
        defaultConfig.model.jsonPath = "https://cdn.jsdelivr.net/gh/evrstr/live2d-widget-models/live2d_evrstr/" + name + "/model.json";
        L2Dwidget.init(defaultConfig);
        let json_src = document.getElementById("json_src");
        let download_title = document.getElementById("download_title");
        download_title.innerText = name;
        json_src.value = defaultConfig.model.jsonPath
    }

}



function isInSight(el) {
    const bound = el.getBoundingClientRect();
    const clientHeight = window.innerHeight;
    //如果只考虑向下滚动加载
    //const clientWidth = window.innerWeight;
    return bound.top <= clientHeight + 100;
}

function checkImgs() {
    const imgs = document.querySelectorAll('.card_img');
    Array.from(imgs).forEach(el => {
        if (isInSight(el)) {
            loadImg(el);
        }
    })
}

function loadImg(el) {
    if (el.src == "https://cdn.jsdelivr.net/gh/evrstr/img/blog_evrstr/loading.gif") {
        const source = el.dataset.src;
        el.src = source;
    }
}

function throttle(fn, mustRun = 500) {
    const timer = null;
    let previous = null;
    return function() {
        const now = new Date();
        const context = this;
        const args = arguments;
        if (!previous) {
            previous = now;
        }
        const remaining = now - previous;
        if (mustRun && remaining >= mustRun) {
            fn.apply(context, args);
            previous = now;
        }
    }
}

var getdat = function() {
    var url = "dat.json";
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.send(null);
    request.onload = function() {
        if (request.status == 200) {
            json_dat = JSON.parse(request.responseText);


            for (let index = 0; index < json_dat.length; index++) {
                // console.log(json_dat[index]);
                var content = document.getElementById("content");
                var div = document.createElement("div");
                content.appendChild(div);
                create_card(json_dat[index].name, json_dat[index].preview, json_dat[index].json)

            }
        }
    }
    window.onscroll = throttle(checkImgs);
}


function width_add() {
    let add = document.getElementById("width_add");
    let text = document.getElementById("width_text");
    add.onclick = function() {
        text.value = Number(text.value) + 10;
        sub2();
    }
}

function width_del() {
    let del = document.getElementById("width_del");
    let text = document.getElementById("width_text");
    del.onclick = function() {
        text.value = Number(text.value) - 10;
        sub2();
    }
}

function height_add() {
    let add = document.getElementById("height_add");
    let text = document.getElementById("height_text");
    add.onclick = function() {
        text.value = Number(text.value) + 10;
        sub2();
    }
}

function height_del() {
    let del = document.getElementById("height_del");
    let text = document.getElementById("height_text");
    del.onclick = function() {
        text.value = Number(text.value) - 10;
        sub2();
    }
}

function lost_focus() {
    let width_text = document.getElementById("width_text");
    let height_text = document.getElementById("height_text");
    width_text.onblur = function() {
        defaultConfig.display.width = Number(width_text.value);
        defaultConfig.display.height = Number(height_text.value);
        L2Dwidget.init(defaultConfig);
    }
    height_text.onblur = function() {
        defaultConfig.display.width = Number(width_text.value);
        defaultConfig.display.height = Number(height_text.value);
        L2Dwidget.init(defaultConfig);
    }
}

function sub2() {

    let submit = document.getElementById("submit");
    let width = document.getElementById("width_text");
    let height = document.getElementById("height_text");
    defaultConfig.display.width = Number(width.value);
    defaultConfig.display.height = Number(height.value);
    L2Dwidget.init(defaultConfig);

}


function download() {
    let download = document.getElementById("download");
    let download_title = document.getElementById("download_title");
    download.onclick = function() {
        let url = "https://github.com/evrstr/live2d-widget-models/tree/master/live2d_evrstr/" + download_title.innerText;
        window.open(url);
        console.log(url);
    }
}

getdat();
width_add();
width_del();
height_add();
height_del();
lost_focus();
download();


// L2Dwidget.init({
//     "pluginRootPath": "live2dw/",
//     "pluginJsPath": "lib/",
//     "pluginModelPath": "assets/",
//     "tagMode": false,
//     "debug": true,
//     "model": {
//         "jsonPath": "https://cdn.jsdelivr.net/gh/evrstr/live2d-widget-models/live2d_evrstr/aoba/model.json"
//     },
//     "display": {
//         "position": "right",
//         "width": 180,
//         "height": 360
//     },
//     "mobile": {
//         "show": true
//     },
//     "log": true
// });