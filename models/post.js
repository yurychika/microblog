var mongodb = require('./db');


function post(post){
	this.username = post.username;
	this.text = post.text;
	this.time = post.time;
}
module.exports = post;

post.prototype.save = function save(callback){
	var post = {
		username: this.username,
		text: this.text,
		time: this.time
	}


	mongodb.open(function(err, db){
		if(err){
			return callback(err);
		}

		db.collection('posts', function(err, collection){
	      // 为 name 属性添加索引 
	      collection.ensureIndex('name', {unique: true}); 
	      // 写入 user 文档 
	      collection.insert(post, {safe: true}, function(err, user) { 
	        mongodb.close(); 
	        callback(err, user); 
	      }); 			
		})
	})

}

post.get = function(username, callback){
  mongodb.open(function(err, db) { 
    if (err) { 
      return callback(err); 
    } 
    // 读取 users 集合 
    db.collection('posts', function(err, collection) { 
      if (err) { 
        mongodb.close(); 
        return callback(err); 
      } 
      // 查找 name 属性为 username 的文档 
      collection.findOne({ username: username }, function(err, doc) { 
        mongodb.close(); 
        if (doc) { 
          // 封装文档为 User 对象 
          var user = new post(doc); 
          callback(err, user); 
        } else { 
          callback(err, null); 
        } 
      }); 
    }); 
  }); 

}