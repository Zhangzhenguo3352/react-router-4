var express = require('express');
//parser 解析器
var bodyParser = require('body-parser');
var request = require('request');
var app = express();


//设置静态文件目录

//express 表现
// static 静态的
// __dirname 当前的路径
// __filename 包含文件名的一个 路径
app.use(express.static(__dirname + '/static'))
// bodyParser.json()    body分析器,是解析 json 格式的
app.use(bodyParser.json());
// bodyParser body分析器
//urlencoded  URL编码
app.use(bodyParser.urlencoded({
  // extended 扩展
    extended: false
}));

//获取所有的栏目
app.get('/wapindex.aspx', function (req, res) {
    request.get({
        url: 'http://xk-web.kelink.com/wapindex.aspx', qs: req.query
    }, function (err, httpResponse, body) {
        res.send(body);

    });
});

//获取文章列表
app.get('/article/list.aspx', function (req, res) {
  // req  请求  客户端 =》 服务器
  // res  响应  服务器 =》 客户端
  // req.query  请求参数
    request.get({
        url: 'http://xk-web.kelink.com/article/list.aspx', qs: req.query
    }, function (err, httpResponse, body) {
        //      请求失败信息   请求成功所有路径信息        请求成功当前页面信息
        res.send(body);

    });
});

//获取文章内容
app.get('/article/view.aspx', function (req, res) {

    request.get({
        url: 'http://xk-web.kelink.com/article/view.aspx', qs: req.query
    }, function (err, httpResponse, body) {
        res.send(body);
    });
});

//登录

app.post('/waplogin.aspx', function (req, res) {
    request.post({ url: 'http://xk-web.kelink.com/JsonAPI/waplogin.aspx', form: req.body }, function (err, httpResponse, body) {
        res.send(body);
    });

});

//设置任意路由都返回html
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/webapp.html')
});

//创建服务器
app.listen(3000, function () {
    console.log('请在浏览器中打开：http://localhost:3000/')
});
