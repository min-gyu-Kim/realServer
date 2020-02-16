module.exports = {
    server_port: 3000,
    db_url: "mongodb://mg:sky950906@ds141294.mlab.com:41294/heroku_sldlzhtq",
    db_schemas: [
        {file: './user_schema', collection: 'users', schemaName: 'UserSchema', modelName: 'UserModel'},
        {file: './post_schema', collection: 'post', schemaName: 'PostSchema', modelName: 'PostModel'},
        {file: './notice_schema', collection: 'notice', schemaName: 'NoticeSchema', modelName: 'NoticeModel'
        },
        {file: './gallery_schema', collection: 'gallery', schemaName:'GallerySchema', modelName: 'GalleryModel'}
    ],
    route_info: [
        {file: './home', type: 'get', method: 'goHome', path: '/'},
        {file: './user', type: 'get', method: 'showUserInfo', path: '/user'},
        {file: './user', type: 'get', method: 'showAllUser', path: '/user/showAll'},
        {file: './user', type: 'post', method: 'login', path: '/user/login'},
        {file: './user', type: 'get', method: 'logout', path: '/user/logout'},
        {file: './notice', type: 'get', method: 'showAllNotices', path: '/notice/showAll'},
        {file: './notice', type: 'get', method: 'ShowWriteNotice', path: '/notice/showWrite'},
        {file: './notice', type: 'post', method: 'writeNotice', path: '/notice/write'},
        {file: './notice', type: 'get', method: 'showNotice', path: '/notice/show'},
        {file:'./post', type: 'get', method: 'showAllPost', path: '/post/showAll'},
        {file:'./post', type: 'get', method: 'ShowWritePost', path: '/post/showWrite'},
        {file:'./post', type: 'post', method: 'writeNotice', path: '/post/write'},
        {file: './post', type: 'get', method: 'showPost', path: '/post/show'},      //여기서부터 갤러리
        {file: './gallery', type: 'get', method: 'showGalleryAll', path: '/gallery/showAll'},
        {file: './gallery', type: 'get', method: 'showWriteGallery', path: '/gallery/showWrite'},
        {file: './gallery', type: 'post', method: 'uploadImage', path: '/gallery/upload'}
    ]
}