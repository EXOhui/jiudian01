var url=require("url");
var formidable = require("formidable");
var crypto = require('crypto');
var yuding=require('../models/yuding.js');
var Type=require('../models/type.js');
var user = require("../models/user.js");
var Typefh=require('../models/typefh.js');
var ruzhu=require('../models/ruzhu.js');

//首页
exports.showIndex=function (req, res) {
    res.render("index");
}

//在线预订
exports.showYuding=function (req, res) {
    res.render("yuding");
}
exports.addYuding = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        yuding.addStudent(fields,function(result){
            res.json({"result" : result});
        });
    });
}
exports.leibiefj=function (req, res) {
    Type.find({}).exec(function(err,results){
        res.json({"result":results});
    });
}
exports.jiagef=function (req, res) {
    Type.find({}).exec(function(err,results){
        res.json({"result":results});
    });
}

//订单查询
exports.showDchaxun=function (req, res) {
    res.render("chaxun");
}
exports.fanghao=function (req, res) {
    Typefh.find({}).exec(function(err,results){
        res.json({"result":results});
    });
}
exports.addRuzhu = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        ruzhu.addStudent(fields,function(result){
            res.json({"result" : result});
        });
    });
}
exports.showupdateFangHao = function(req,res){
    var sid = req.params.sid;
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        Typefh.update({"sid":sid},{$set:{"zhuangtai":fields.zhuangtai}},function (err) {
            if(err){
                res.json({"result" : -1});
            }else{
                res.json({"result" : 1});
            }
        })
    });
}
exports.showupdateFangshu = function(req,res){
    var sid = req.params.sid;
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        Type.update({"leixing":sid},{$set:{"yushuliang":fields.yushuliang-1}},function (err) {
            if(err){
                res.json({"result" : -1});
            }else{
                res.json({"result" : 1});
            }
        })
    });
}
exports.jiashufanghaotype = function(req,res){
    var sid = req.params.sid;
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        Type.update({"leixing":sid},{$set:{"yushuliang":fields.yushuliang+1}},function (err) {
            if(err){
                res.json({"result" : -1});
            }else{
                res.json({"result" : 1});
            }
        })
    });
}
exports.updateTypedx = function(req,res){
    var sid = req.params.sid;
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        yuding.update({"name":sid},{$set:{"comeday":fields.comeday,"goday":fields.goday,"leixing":fields.leixing,"shuliang":fields.shuliang,"name":fields.name,"rename":fields.rename,"phone":fields.phone,"liuyan":fields.liuyan}},function (err) {
            if(err){
                res.json({"result" : -1});
            }else{
                res.json({"result" : 1});
            }
        })
    });
}
exports.showUpdatedx = function(req,res){
    var sid = req.params.sid;
    yuding.find({"name" : sid},function(err,results){
        if(results.length == 0){
            res.json({"result" : -1});
            return;
        }else{
            res.json({"result" : results[0]});
        }
    });
}

//管理员登录
exports.showReg=function (req, res) {
    res.render("login");
}
exports.checklogin = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fileds, files) {
        var yonghuming = fileds.yonghuming;
        var mima = fileds.mima;
        user.findUserByName(yonghuming, function (err, doc) {
            if (!doc) {
                res.json({ "result": -1 })
                return;
            }
            if (crypto.createHmac("sha256", mima).digest("hex") == doc.mima) {
                req.session.login = 1;
                req.session.yonghuming = yonghuming;
                res.json({ "result": 1 });
                return;
            } else {
                res.json({ "result": -2 });
                return;
            }
        })
    })
}
exports.checkuserexist = function (req, res, next) {
    var queryobj = url.parse(req.url, true).query;
    if (!queryobj.yonghuming) {
        res.send("请提供用户名参数");
        return;
    }
    user.findUserByName(queryobj.yonghuming, function (err, doc) {
        if (doc) {
            res.json({ "result": -1 })
        } else {
            res.json({ "result": 1 })
        }
    })
}

//管理首页
exports.showMange = function(req,res,next){
    res.render("mange");
}
exports.showdatang = function (req,res,next) {
    res.render("datang");
}
exports.showdindan = function (req,res,next) {
    res.render("dindan");
}
exports.yudingchaxun=function (req, res) {
    yuding.find({}).exec(function(err,results){
        res.json({"result":results});
    });
}

//退房管理
exports.showtui = function (req, res,next) {
    res.render("tui");
}
exports.tuifangcx=function (req, res) {
    ruzhu.find({}).exec(function(err,results){
        res.json({"result":results});
    });
}
exports.showupdateTuiFang = function(req,res){
    var sid = req.params.sid;
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        Typefh.update({"sid":sid},{$set:{"zhuangtai":fields.zhuangtai}},function (err) {
            if(err){
                res.json({"result" : -1});
            }else{
                res.json({"result" : 1});
            }
        })
    });
}
exports.showupdateYiTuiFang = function(req,res){
    var sid = req.params.sid;
    console.log(sid)
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        console.log(fields.zhuangtai);
        ruzhu.update({"sid":sid},{$set:{"zhuangtai":fields.zhuangtai}},function (err) {
            if(err){
                res.json({"result" : -1});
            }else{
                res.json({"result" : 1});
            }
        })
    });
}
exports.showTFdelete=function(req,res){
    var sid= req.params.sid;
    yuding.find({'name':sid},function (err, results) {
        if (err||results.length==0){
            res.json({"result":-1});
            return;
        }
        results[0].remove(function (err) {
            if (err){
                res.json({'result':-1});
                return;
            }
            res.json({'result':1})
        })
    })
}

//记录查询
exports.showcheck = function (req,res,next) {
    res.render("check");
}
exports.showRuzhuxinxi=function (req, res) {
    ruzhu.find({}).exec(function(err,results){
        res.json({"result":results});
    });
}

//房间管理
exports.showrefer = function (req,res,next) {
    res.render("refer");
}
exports.doAddfh = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        Typefh.addStudent(fields,function(result){
            res.json({"result" : result});
        });
    });
}
exports.getAllfh=function (req, res) {
    var page = url.parse(req.url,true).query.page - 1 || 0;
    var pagesize =3;
    Typefh.count({},function(err,count){
        Typefh.find({}).limit(pagesize).skip(pagesize * page).exec(function(err,results){
            res.json({
                "pageAmount" : Math.ceil(count / pagesize),
                "results" : results
            });
        });
    });
}
exports.updateTypefh = function(req,res){
    var sid = req.params.sid;
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        Typefh.update({"sid":sid},{$set:{"leixing":fields.leixings,"weizhi":fields.weizhis,"miaoshu":fields.miaoshus,"zhuangtai":fields.zhuangtais}},function (err) {
            if(err){
                res.json({"result" : -1});
            }else{
                res.json({"result" : 1});
            }
        })
    });
}
exports.showUpdatefh = function(req,res){
    var sid = req.params.sid;
    Typefh.find({"sid" : sid},function(err,results){
        if(results.length == 0){
            res.json({"result" : -1});
            return;
        }else{
            res.json({"result" : results[0]});
        }
    });
}
exports.deletefh=function(req,res){
    var sid= req.params.sid;
    Typefh.find({'sid':sid},function (err, results) {
        if (err||results.length==0){
            res.json({"result":-1});
            return;
        }
        results[0].remove(function (err) {
            if (err){
                res.json({'result':-1});
                return;
            }
            res.json({'result':1})
        })
    })
}

//房类管理
exports.showlei=function(req,res){
    Type.getAll(function(data){
        for(let i=0;i<data.length;i++){
            let name=data[i];
            Typefh.count({"leixing":name.leixing},function(err,count){
                Typefh.count({"zhuangtai":"未入住","leixing":name.leixing},function(err,count_b){
                    name.fangshuliang=count;
                    name.yushuliang=count_b;
                    name.save(function(err){
                    })
                })
            })
        }
        res.render("lei");
        return;
    })
}
exports.doAdd = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        Type.addStudent(fields,function(result){
            res.json({"result" : result});
        });
    });
}
exports.getAll=function (req, res) {
    var page = url.parse(req.url,true).query.page - 1 || 0;
    var pagesize =3;
    Type.count({},function(err,count){
        Type.find({}).limit(pagesize).skip(pagesize * page).exec(function(err,results){
            res.json({
                "pageAmount" : Math.ceil(count / pagesize),
                "results" : results
            });
        });
    });
}
exports.updateType = function(req,res){
    var sid = req.params.sid;
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        Type.update({"sid":sid},{$set:{"leixing":fields.leixings,"mianji":fields.mianjis,"chuangshuliang":fields.chuangshuliangs,"zaocan":fields.zaocans,"wangluo":fields.wangluos,"dianshi":fields.dianshis,"jiage":fields.jiages,"fangshuliang":fields.fangshuliangs,"yushuliang":fields.yushuliangs}},function (err) {
            if(err){
                res.json({"result" : -1});
            }else{
                res.json({"result" : 1});
            }
        })
    });
}
exports.showUpdate = function(req,res){
    var sid = req.params.sid;
    Type.find({"sid" : sid},function(err,results){
        if(results.length == 0){
            res.json({"result" : -1});
            return;
        }else{
            res.json({"result" : results[0]});
        }
    });
}
exports.delete=function(req,res){
    var sid= req.params.sid;
    Type.find({'sid':sid},function (err, results) {
        if (err||results.length==0){
            res.json({"result":-1});
            return;
        }
        results[0].remove(function (err) {
            if (err){
                res.json({'result':-1});
                return;
            }
            res.json({'result':1})
        })
    })
}

//修改密码
exports.showmima = function (req,res,next) {
    res.render("mima");
}
exports.changepw = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        user.changepw(fields.yonghuming, fields.mima, function (info) {
            res.end(info);
        });
    });
};
exports.showadmin = function (req, res) {
    user.getAll(function (results) {
        res.json({"results": results});
    })
};

//房间
exports.showroom=function (req, res) {
    res.render("room");
}