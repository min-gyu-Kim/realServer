var showUserInfo = function(req, res){
    var userNo = req.query.userNo;
    
    getUserInfo(req.app.get('database'), userNo, function(err, results){
        if(!results){
            return;
        }
        var birth = results[0]._doc.birth;
        var age = new Date().getFullYear() - birth.getFullYear() + 1;
        
        var strBirth = convertBirth(birth);
        
        var authUser = '<button type="button" onclick="login()"><i class="fa fa-sign-in" aria-hidden="true"></i>로그인</button>';
        
        if('user' in req.session){
            authUser = '<a href="/user/logout">로그아웃</a>';
        }
        
        var context = {
            userName: results[0]._doc.name,
            userAge: age,
            userPhone: results[0]._doc.phone,
            userBirth: strBirth,
            authUser: authUser
        };
        
        res.render('userInfo', context);
    });
};

var showAllUser = function(req, res){
    getAllUser(req.app.get('database'), function(err, results){
        if(!results) return;
        
        var strUser = '';
        results.forEach(function(item, index){
            var birth = item.birth;
            var age = new Date().getFullYear() - birth.getFullYear() + 1;
            var strBirth = convertBirth(birth);
            
            strUser += '<tr onclick="location.href=\'/user?userNo=' + item.number + '\'"><td>' + item.name + '</td><td>' + age + '</td><td>' + item.phone + '</td><td>' + strBirth + '</td></tr>';
        });
        
        var authUser = '<button type="button" onclick="login()"><i class="fa fa-sign-in" aria-hidden="true"></i>로그인</button>';
        
        if('user' in req.session){
            authUser = '<a href="/user/logout">로그아웃</a>';
        }
        
        var context = {
            users: strUser,
            authUser: authUser
        };
        res.render('allUser', context);
    })
};

var login = function(req, res){
    var paramID = req.body.id;
    var paramPassword = req.body.password;
    var database = req.app.get('database');
    
    authUser(database, paramID, paramPassword, function(err, result){
        if(err){
            console.log('err 발생');
            console.log(err.stack);
            return;
        }
        
        if(!result){
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf8'});
            res.write('<h1>해당 아이디는 존재하지 않습니다.</h1>');
            res.write('<a href="/">홈으로 이동</a>');
            return;
        }
        
        var sessions = database.db.models.Session;
        
        sessions.findOne({user: req.session.user}).exec(function(err, data){
            var sessUser = data.session.user;
            console.dir(sessUser);
            
            if(sessUser){
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf8'});
                res.write('<h1>이미 로그인중입니다.</h1>');
                res.write('<a href="/">홈으로 이동</a>');
                return;
            }
            req.session.user = {
                name: result.name,
                id: result.id,
                number: result.number
            };

            res.redirect('/');
        });
    });
}

var logout = function(req, res){
    req.session.destroy();
    res.redirect('/');
}

// ------------- 일반 함수 -----------------
var getAllUser = function(database, callback){
    database.UserModel.findAll(function(err, docs){
        if(err){
            callback(err, null);
            return;
        }
        callback(null, docs);
    });
}

var getUserInfo = function(database, number, callback){
    database.UserModel.findByNo(number, function(err, docs){
        if(err){
            callback(err, null);
            return;
        }
        callback(null, docs);
    });
}

var convertBirth = function(date){
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var strBirth = date.getFullYear() + '/' + (month < 10 ? '0' + month : month) + '/' + (day < 10 ? '0' + day : day);
    
    return strBirth;
}

var authUser = function(database, id, password, callback){
    database.UserModel.findById(id, function(err, doc){
        if(err){
            callback(err, null);
            return;
        }
        
        if(doc[0]._doc.password == password){
            callback(null, doc[0]._doc);
        } else{
            callback(null, null);
        }
    });
}

module.exports.showUserInfo = showUserInfo;
module.exports.showAllUser = showAllUser;
module.exports.login = login;
module.exports.logout = logout;