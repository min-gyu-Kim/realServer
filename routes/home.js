var goHome = function(req, res){
    var database = req.app.get('database');
    getUsers(database, function(err, results){
        var strUsers = '';

        for(var i = 0; i < 5; i++){
            if(i >= results.length) break;
            strUsers += '<a href="/user?userNo=' + results[i].number + '"><li>' + results[i].name + '</li></a>';
        }
        
        var authUser = '<button type="button" onclick="login()"><i class="fa fa-sign-in" aria-hidden="true"></i>로그인</button>';
        
        if('user' in req.session){
            authUser = '<a href="/user/logout">로그아웃</a>';
        }
        
        //공지사항 가져오기
        database.NoticeModel.find().sort({number: -1}).limit(5).exec(function(err, datas){
            var notices = '';
            
            datas.forEach(function(item, index){
                notices += '<li><a href="/notice/show?num=' + item._doc.number + '">' + item._doc.title + '</a></li>';
            });
            
            database.PostModel.find().sort({number:-1}).limit(5).exec(function(err, datas){
                var posts = '';
                datas.forEach(function(item, index){
                    posts += '<a href="/post/show?num=' + item._doc.number + '"><li>' + item._doc.title + '<span>작성자: ' + item._doc.name + '</span></li></a>';
                });
                
                var context = {users: strUsers, authUser: authUser, notices: notices, posts: posts};
                res.render('index', context);
            });
        });
    });
}

var getUsers = function(database, callback){
    database.UserModel.findAll(function(err, docs){
        if(err){
            callback(err, null);
            return;
        }
        callback(null, docs);
    });
}

module.exports.goHome = goHome;