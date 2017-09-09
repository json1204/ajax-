/*使用对象进行封装*/
var $ = {
  /*将传入的对象参数转换为字符串
  * {"name":"jack","age":20} >> name=jack&age=20*/
  getPa: function (data) {
    var str = ''
    for (var key in data) {
      str = str + key + '=' + data[key] + '&'
    }
    return str.slice(0, -1)
  },
  /*type:请求方式
  * url:请求的url--必需
  * data:需要传递给后台的参数,需要json格式的对象{key:value,key:value.....}
  * success:成功之后的回调*/
  ajax: function (obj) {
    /*1.判断用户是否传递的obj,如果没有传递则不进行本次的处理*/
    if (!obj || typeof obj != 'object') {
      return
    }
    /*2.接收参数*/
    /*2.1 如果没有传递请求方式，默认为get*/
    var type = obj.type || 'get'
    /*2.2 接收url  如果没有传递则默认当前页面进行处理：location.pathname就是获取当前页面的路径 */
    var url = obj.url || location.pathname
    /*2.3 参数：传递到后台页的参数*/
    var data = obj.data || null
    /*2.4 接收成功之后的回调函数*/
    var success = obj.success || null
    /*3.发送请求*/
    var xhr = new XMLHttpRequest()
    /*3.1设置请求行 ,如果是get方式就需要拼接参数*/
    data = this.getPa(data)
    if (type == 'get') {
      url = url + '?' + data
      data = null
    }
    xhr.open(type, url)
    /*3.2设置请求头*/
    if (type == 'post') {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    }
    /*3.3设置请求体*/
    xhr.send(data)
    /*4.接收返回值*/
    xhr.onreadystatechange = function () {
      if (xhr.status == 200 && xhr.readyState == 4) {
        var rt = xhr.getResponseHeader('Content-Type')
        var result = null
        /*判断返回值类型*/
        if (rt.indexOf('xml') != -1) {
          result = xhr.responseXML
        }else if (rt.indexOf('json') != -1) {
          result = JSON.parse(xhr.responseText)
        }else {
          result = xhr.responseText
        }
        /*5.调用回调函数*/
        success && success(result)
      }
    }
  }
}
