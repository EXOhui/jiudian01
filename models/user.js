var mongoose = require('mongoose');
var crypto = require('crypto');
var userSchema = mongoose.Schema({
    yonghuming: String,
    mima: String,
});
userSchema.statics.findUserByName = function (yonghuming, callback) {
    this.findOne({ "yonghuming": yonghuming }, function (err, results) {
        callback(err, results);
    });
};
userSchema.statics.changepw = function (yonghuming, mima, callback) {
    this.find({ "yonghuming": yonghuming }, function (err, results) {
        if (err) {
            callback("服务器错误！请检查输入的内容！");
            return;
        }
        if (results.length == 0) {
            callback("没有找到");
        } else {
            thestudent = results[0];
            thestudent.mima = crypto.createHmac("sha256", mima).digest("hex");
            thestudent.save();
            callback("成功修改！");
        }
    });
};
userSchema.statics.getAll = function (callback) {
    this.find({}).exec(function (err, results) {
        callback(results);
    });
};
var user = mongoose.model("user", userSchema);

module.exports = user;
