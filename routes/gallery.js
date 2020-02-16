const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        console.log(file)
        cb(null, file.originalname)
    }
});

const cloudinary = require('cloudinary').v2
cloudinary.config ({ 
   cloud_name : 'hihzmx3oj' , 
   api_key : '612115359769775' , 
   api_secret : 'f0LiNBOlItsIxkd-9aNq6mSk0mc'  
});

var showGalleryAll = function(req, res){
    var authUser = '<button type="button" onclick="login()"><i class="fa fa-sign-in" aria-hidden="true"></i>로그인</button>';
    var user = '';
    
    if('user' in req.session){
        authUser = '<a href="/user/logout">로그아웃</a>';
        user = '<button type="button" onclick="location.href=\'/gallery/showWrite\'">이미지 올리기</button>';
    }
    
    var database = req.app.get('database');
    database.GalleryModel.find({}).exec(function(err, datas){
        var images ='';
        res.send(cloudinary.image(datas[0].img_url))
        /*datas.forEach(function(item, index){
            images += '<div class="image_form" onclick="location.href=\'/gallery/show?num=' + item.number + '\'"><div class="image">' + cloudinary.image(item.img_url, {quality: "auto", fetch_format: "auto"}) + '"</div><div class="img_info"><p class="imgTitle">' + item.title + '</p><div class="imgName">' + item.name + '</div></div></div>';
        });
        
        var context = {
            authUser: authUser,
            user: user,
            images: images
        };

        res.render('gallerys', context);*/
    })
}

var showWriteGallery = function(req, res){
    var authUser = '<button type="button" onclick="login()"><i class="fa fa-sign-in" aria-hidden="true"></i>로그인</button>';
    
    if('user' in req.session){
        authUser = '<a href="/user/logout">로그아웃</a>';
    }
    
    var context = {
        authUser: authUser,
    };
    
    res.render('writeGallery', context);
}

var uploadImage = function(req, res){
    const upload = multer({ storage }).single('image');
    
    upload(req, res, function(err) {
        if (err) {
            console.dir(req.body);
            console.log(err.stack)
            return res.send(err)
        }

        const path = req.file.path
        const uniqueFilename = new Date().toISOString();

        cloudinary.uploader.upload(
              path,
              { public_id: `friends/${uniqueFilename}`, tags: `friends` }, // directory and tags are optional
              function(err, image) {
                    if (err) return res.send(err);
                    console.log(image);
                    // remove file from server
                    const fs = require('fs');
                    fs.unlinkSync(path);
                    // return image details
                    
                    var url = image.public_id + require('path').extname(image.url);
                  
                    console.log(image);
                      
                    addGallery(req.app.get('database'), req.body.title, url, req.session.user.name, function(err, docs){
                        if(err){
                            console.log(err.stack);
                            res.send(err);
                            return;
                        }
                        res.redirect('/gallery/showAll'); 
                    });
              }
        )
  });
}

// ----------- 일반 함수들 ---------
var addGallery = function(database, title, img_url, name, callback){
    var gallery = new database.GalleryModel({
        name: name, title: title, img_url: img_url, date: Date.now()
    });
    
    gallery.save(function(err){
        if(err){
            callback(err, null);
            return;
        }
        callback(null, gallery);
    })
}
module.exports.showGalleryAll = showGalleryAll;
module.exports.showWriteGallery = showWriteGallery;
module.exports.uploadImage = uploadImage;