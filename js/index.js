
var message = document.getElementById("message");
var content = document.getElementsByClassName("content")[0];
var sendBtn = document.getElementById("send");
message.onkeydown = function (e) {
    //判断按下的是否为enter
    // console.log(e.keyCode);
    if (e.keyCode == 13) {
        var value = message.value;
        //判断是否输入有值
        console.log(e.value);
        if (value) {
            renderMessage('mine', value);
            this.value = "";
            sendMessage(value);
        }
    }
}
sendBtn.onclick = function(){
    if (message.value) {
        renderMessage('mine', message.value);
        message.value = "";
        sendMessage(message.value);
    }
}

//发出网络请求方法
function sendMessage(text) {
    ajax({
        method: "get",
        url: "https://developer.duyiedu.com/edu/turing/chat",
        data: "text=" + text,
        success: function (data) {
            console.log(data);
            renderMessage('robot', data.text);
        }
    })
}


//渲染数据
function renderMessage(who, text) {
    var dom = document.createElement("div");
    var img = new Image();
    var textDom = document.createElement("div");
    img.className = "avatar";
    textDom.className = "text";
    textDom.innerText = text;
    if (who == 'mine') {
        img.src = "./images/mine.jpg";
        dom.className = "mine";
    } else {
        img.src = "./images/bot.jpg";
        dom.className = "robot";
    }
    dom.appendChild(img);
    dom.appendChild(textDom);
    content.appendChild(dom);
    content.scrollTo(0, content.scrollHeight - content.clientHeight);
}