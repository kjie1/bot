// POST请求的数据要放到请求体当中

// // 设置请求体在传递参数，是以什么编码类型进行传递的
// xhr.setRequestHeader("Content—Text","application/x-www-form-urlencoded");
// xhr.send()//写到send里面，

//封装一个ajax
/**
 * 
 * @param {object} options
 *                  method:请求方法
 *                  url:请求地址
 *                  data:请求参数(数据)
 *                  isAsync:是否异步
 *                  success:回调函数
 *                  error：错误提示
 *                   
 */
function ajax(options){
    var method = options.method || "GET";
    var url = options.url || "";
    var data = options.data || "";
    var success = options.success || function (){};
    var isAsync = options.isAsync !== undefined? options.isAsync:true;
    var error = options.error || function (){};

    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new window.XMLHttpRequest();
    }else{
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }


    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            success(JSON.parse(xhr.responseText));
        }
    }
    xhr.error = function(e){
        error("error");
    }


    method = method.toUpperCase();
    if(method == "GET"){
        //判断当前有没有？
        if(url.indexOf("?") > -1){  //有数据
            //判断？是不是length-1
            if(url.indexOf("?") === url.length - 1){
                url += data;
            }else{
                url += "&" + data;
            }
        }else{//小于等于-1
            url += "?" + data;
        }

        xhr.open(method,url,isAsync);
        xhr.send();
    }else if(method == "POST"){
        xhr.open(method,url,isAsync);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send(data);
    }
}

// ajax({
//     method:"get",
//     url:"http://developer.duyiedu.com/edu/testAjaxCrossOrigin",
//     data:"appkey=kang_1612449952758",
//     success:function(data){
//         console.log(data);
//     }
// })