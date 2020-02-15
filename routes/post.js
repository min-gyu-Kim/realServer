var showAllPost = function(req, res){
    getAllPosts(req.app.get('database'), function(err, results){
        var user = '';
        
        var authUser = '<button type="button" onclick="login()"><i class="fa fa-sign-in" aria-hidden="true"></i>로그인</button>';
        
        if('user' in req.session){
            authUser = '<a href="/user/logout">로그아웃</a>';
            user = '<button type="button" onclick="location.href=\'/post/showWrite\'">게시글 작성하기</button>';
        }
        
        var posts = '';
        
        results.sort(function(a, b){
            return b._doc.number - a._doc.number;
        });
        results.forEach(function(item, index){
            var num = item._doc.number;
            var title = item._doc.title;
            var date = item._doc.date;
            var name = item._doc.name;
            
            date = convertDate(date);
            
            posts += '<tr onclick="location.href=\'/post/show?num=' + num + '\'"><td>' + num + '</td><td>' + title + '</td><td>' + name + '</td><td>' + date + '</td></tr>';
        });
        
        var context = {
            authUser: authUser,
            posts: posts,
            user: user
        };
        
        res.render('posts', context);
    });
}

var ShowWritePost = function(req, res){
    var authUser = '<button type="button" onclick="login()"><i class="fa fa-sign-in" aria-hidden="true"></i>로그인</button>';
        
    if('user' in req.session){
        authUser = '<a href="/user/logout">로그아웃</a>';
    }
    
    var context = {
        authUser: authUser
    };
    
    res.render('writePost', context);
}

var writeNotice = function(req, res){
    var paramTitle = req.body.not_title;
    var paramContent = req.body.not_content;
    
    var database = req.app.get('database');
    
    addPost(database, paramTitle, paramContent, req.session.user.name, function(err, result){
        if(err){
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8'});
            res.end('<h2>작성 에러 발생</h2>');
            return;
        }
        if(result){
            res.redirect('/post/showAll');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8'});
            res.end('<h2>결과없음</h2>');
            return;
        }
    });
}

var showPost = function(req, res){
    var num = req.query.num;
    var database = req.app.get('database');
    
    database.PostModel.findOne({number: num}).exec(function(err, data){
        var post = data._doc;
        
        var authUser = '<button type="button" onclick="login()"><i class="fa fa-sign-in" aria-hidden="true"></i>로그인</button>';
        
        if('user' in req.session){
            authUser = '<a href="/user/logout">로그아웃</a>';
        }
        
        var date = convertDate(post.date);

        var context = {
            authUser: authUser,
            notTitle: post.title,
            notName: post.name,
            notDate: date,
            notContent: post.content
        };
        
        res.render('showPost', context);
    });
}

//------------- 일반 함수들 ----------
var getAllPosts = function(database, callback){
    database.PostModel.findAll(function(err, docs){
        if(err){
            callback(err, null);
            return;
        }
        callback(null, docs);
    });
}

var addPost = function(database, title, content, name, callback){
    var post = new database.PostModel({
        name: name, title: title, content: content, date: Date.now()
    });
    
    post.save(function(err){
        if(err){
            callback(err, null);
            return;
        }
        callback(null, post);
    })
}

var convertDate = function(date){
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    var day = date.getDate();
    day = day < 10 ? '0' + day : day;
    
    var strDate = year + '/' + month + '/' + day;
    
    return strDate;
}

module.exports.showAllPost = showAllPost;
module.exports.ShowWritePost = ShowWritePost;
module.exports.writeNotice = writeNotice;
module.exports.showPost = showPost;