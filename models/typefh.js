var mongoose = require('mongoose');


var typefhSchema = new mongoose.Schema({
    sid:Number,
    leixing : String,
    weizhi : String,
    miaoshu : String,
    zhuangtai : String
});


typefhSchema.statics.addStudent = function(json,callback){
    var s = new Typefh(json);
    s.save(function(err){
        if(err){
            callback(-2);
            return;
        }
        callback(1);
    });
}



var Typefh = mongoose.model("Typefh",typefhSchema);
module.exports = Typefh;