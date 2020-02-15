var showAllNotices = function(req, res){
    getAllNotices(req.app.get('database'), function(err, results){
        var admin = '';
        
        var authUser = '<button type="button" onclick="login()"><i class="fa fa-sign-in" aria-hidden="true"></i>로그인</button>';
        
        if('user' in req.session){
            authUser = '<a href="/user/logout">로그아웃</a>';
            admin = req.session.user.id == 'rlaalsrb2003' ? '<button type="button" onclick="location.href=\'/notice/showWrite\'">공지글 작성하기</button>' : '';
        }
        
        var notices = '';
        
        results.sort(function(a, b){
            return b._doc.number - a._doc.number;
        });
        results.forEach(function(item, index){
            var num = item._doc.number;
            var title = item._doc.title;
            var date = item._doc.created_at;
            var name = item._doc.name;
            
            date = convertDate(date);
            
            notices += '<tr onclick="location.href=\'/notice/show?num=' + num + '\'"><td>' + num + '</td><td>' + title + '</td><td>' + name + '</td><td>' + date + '</td></tr>';
        });
        
        var context = {
            authUser: authUser,
            admin: admin,
            notices: notices
        };
        
        res.render('notices', context);
    });
};

var ShowWriteNotice = function(req, res){
    var authUser = '<button type="button" onclick="login()"><i class="fa fa-sign-in" aria-hidden="true"></i>로그인</button>';
        
    if('user' in req.session){
        authUser = '<a href="/user/logout">로그아웃</a>';
    }
    
    var context = {
        authUser: authUser
    };
    
    res.render('writeNotice', context);
}

var writeNotice = function(req, res){
    var paramTitle = req.body.not_title;
    var paramContent = req.body.not_content;
    
    var database = req.app.get('database');
    
    addNotice(database, paramTitle, paramContent, req.session.user.name, function(err, result){
        if(err){
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8'});
            res.end('<h2>작성 에러 발생</h2>');
            return;
        }
        if(result){
            res.redirect('/notice/showAll');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8'});
            res.end('<h2>결과없음</h2>');
            return;
        }
    });
}

var showNotice = function(req, res){
    var num = req.query.num;
    var database = req.app.get('database');
    
    database.NoticeModel.findOne({number: num}).exec(function(err, data){
        var notice = data._doc;
        
        var authUser = '<button type="button" onclick="login()"><i class="fa fa-sign-in" aria-hidden="true"></i>로그인</button>';
        
        if('user' in req.session){
            authUser = '<a href="/user/logout">로그아웃</a>';
        }
        
        var date = convertDate(notice.created_at);

        var context = {
            authUser: authUser,
            notTitle: notice.title,
            notName: notice.name,
            notDate: date,
            notContent: notice.content
        };
        
        res.render('showNotice', context);
    });
}

//------------- 일반 함수들 ----------

var getAllNotices = function(database, callback){
    database.NoticeModel.findAll(function(err, docs){
        if(err){
            callback(err, null);
            return;
        }
        callback(null, docs);
    });
}

var addNotice = function(database, title, content, name, callback){
    var notice = new database.NoticeModel({
        name: name, title: title, content: content, created_at: Date.now()
    });
    
    notice.save(function(err){
        if(err){
            callback(err, null);
            return;
        }
        callback(null, notice);
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

module.exports.showAllNotices = showAllNotices;
module.exports.ShowWriteNotice = ShowWriteNotice;
module.exports.writeNotice = writeNotice;
module.exports.showNotice = showNotice;