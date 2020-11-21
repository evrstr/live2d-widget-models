var defaultConfig = {
    model: {
        jsonPath: "https://cdn.jsdelivr.net/gh/evrstr/live2d-widget-models/live2d_evrstr/aoba/model.json",
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
    img.src = preview;
    img.alt = name;
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
    h2.onclick = function() {
        defaultConfig.model.jsonPath = "https://cdn.jsdelivr.net/gh/evrstr/live2d-widget-models/live2d_evrstr/" + name + "/model.json";
        L2Dwidget.init(defaultConfig);
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
        // return json_dat;
}


getdat();






// var btn = document.getElementById('22');
// btn.onclick = function() {
//     defaultConfig.model.jsonPath = "https://cdn.jsdelivr.net/gh/evrstr/live2d-widget-models/live2d_evrstr/22/model.json";
//     L2Dwidget.init(defaultConfig);
// }



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