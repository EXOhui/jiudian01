var mongoose = require('mongoose');


var yudingSchema = new mongoose.Schema({
    comeday  : String ,
    goday : String,
    leixing : String,
    shuliang : String,
    name : String,
    rename:String,
    phone:String,
    liuyan:String
});

yudingSchema.statics.addStudent = function(json,callback){
    var s = new yuding(json);
    s.save(function(err){
        if(err){
            callback(-1);
            return;
        }
        callback(1);
    });
}


var yuding = mongoose.model("yuding",yudingSchema);
module.exports = yuding;