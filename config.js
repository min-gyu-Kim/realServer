module.exports = {
    server_port: 3000,
    db_url: "mongodb://mg:sky950906@ds229918.mlab.com:29918/heroku_szlvk4tn",
    db_schemas: [
        {file: './user_schema', collection: 'users', schemaName: 'UserSchema', modelName: 'UserModel'},
        {file: './post_schema', collection: 'post', schemaName: 'PostSchema', modelName: 'PostModel'},
        {file: './notice_schema', collection: 'notice', schemaName: 'NoticeSchema', modelName: 'NoticeModel'
        }
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
        {file: './post', type: 'get', method: 'showPost', path: '/post/show'}
    ]
}