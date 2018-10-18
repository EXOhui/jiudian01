var mongoose = require('mongoose');


var typeSchema = new mongoose.Schema({
    sid:Number,
    leixing : String,
    mianji : String,
    chuangshuliang : String,
    zaocan : String,
    wangluo : String,
    dianshi : String,
    jiage : String,
    fangshuliang : String,
    yushuliang : String
});


typeSchema.statics.addStudent = function(json,callback){
    var s = new Type(json);
    s.save(function(err){
        if(err){
            callback(-2);
            return;
        }
        callback(1);
    });
}
typeSchema.statics.getAll = function (callback) {
    this.find({}).exec(function (err, results) {
        callback(results);
    });
};

var Type = mongoose.model("Type",typeSchema);
module.exports = Type;