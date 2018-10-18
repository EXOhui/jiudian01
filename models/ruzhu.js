var mongoose = require('mongoose');


var ruzhuSchema = new mongoose.Schema({
    sid:String,
    comeday  : String ,
    goday : String,
    name : String,
    rename:String,
    zhengjianhao:String,
    sex:String,
    fanghao:String,
    leixing : String,
    zhuangtai : String,
    xiaofei:String,
    zjleixing:String,
    riqi:String,
    jiage:String,
    yushuliang:String,
});

ruzhuSchema.statics.addStudent = function(json,callback){
    var s = new ruzhu(json);
    s.save(function(err){
        if(err){
            callback(-1);
            return;
        }
        callback(1);
    });
}



var ruzhu = mongoose.model("ruzhu",ruzhuSchema);
module.exports = ruzhu;