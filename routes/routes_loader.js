var config = require('../config');

var routeLoader = {};

routeLoader.init = function(app, router){
    initRoutes(app, router);
};

var initRoutes = function(app, router){
    for(var i = 0; i < config.route_info.length; i++){
        var curItem = config.route_info[i];
        var curModule = require(curItem.file);
        
        if(curItem.type === 'get'){
            router.route(curItem.path).get(curModule[curItem.method]);
        } else if(curItem.type === 'post'){
            router.route(curItem.path).post(curModule[curItem.method]);
        } else{
            console.log('라우팅 함수타입 에러');
        }
    }
    
    app.use('/', router);
}

module.exports = routeLoader;