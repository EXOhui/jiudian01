var express = require("express");
var router = require("./router");
var session = require('express-session');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hotel');
var app = express();
var open = require('open');
app.set("view engine","ejs");
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static('static'));

app.get("/",router.showIndex);//首页

app.get("/yuding",router.showYuding);//在线预订
app.post("/yuding",router.addYuding);
app.get('/leibief', router.leibiefj);
app.get("/jiagef",router.jiagef);

app.get("/chaxun",router.showDchaxun);//订单查询
app.get('/fanghao', router.fanghao);
app.post('/ruzhu', router.addRuzhu);
app.post ('/fanghaotype/:sid',router.showupdateFangHao);
app.post ('/shufanghaotype/:sid',router.showupdateFangshu);//修改房间状态  数量--
app.post ('/jiashufanghaotype/:sid',router.jiashufanghaotype);//修改房间状态  数量++
app.post('/typedx/:sid',router.updateTypedx);
app.get('/typedx/:sid',router.showUpdatedx);

app.get("/login",router.showReg);//管理登录
app.post("/checklogin",router.checklogin);// 检查登录是否成功
app.get("/checkuserexist",router.checkuserexist);// 验证用户名是否被占用

app.get("/mange",router.showMange);//管理登录首页
app.get("/datang",router.showdatang);
app.get("/dindan",router.showdindan);
app.get("/yudingchaxun",router.yudingchaxun);//查找前端订单

app.get("/tui",router.showtui);//退房管理
app.get("/tuifangcx",router.tuifangcx);
app.post ('/tuifang/:sid',router.showupdateTuiFang);
app.post ('/yituifang/:sid',router.showupdateYiTuiFang);
app.delete('/tuifang/:sid', router.showTFdelete);

app.get("/check",router.showcheck);//记录查询
app.get("/ruzhu",router.showRuzhuxinxi);//查询信息

app.get("/refer",router.showrefer);//房间管理
app.post('/doaddfh', router.doAddfh);
app.get('/doaddfh', router.getAllfh);
app.post('/fhtype/:sid',router.updateTypefh);
app.get('/fhtype/:sid',router.showUpdatefh);
app.delete('/doaddfh/:sid',router.deletefh);

app.get("/lei",router.showlei);//房类管理
app.post('/doadd', router.doAdd);
app.get('/doadd', router.getAll);
app.post('/rtype/:sid',router.updateType);
app.get('/rtype/:sid',router.showUpdate);
app.delete('/doadd/:sid',router.delete);

app.get("/mima",router.showmima);//修改密码
app.post("/changepw", router.changepw);
app.get("/name", router.showadmin);

app.get("/room",router.showroom);

open('http://localhost:3000/');
app.listen(3000);