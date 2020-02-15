var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var database = {};

database.init = function(app, config){
    console.log('database_loader모듈 초기화 호출');
    connect(app, config);
};

var connect = function(app, config){
    console.log('데이터베이스 연결을 시도합니다.');
    mongoose.Promise = global.Promise;
    mongoose.connect(config.db_url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex :  true});
    database.db = mongoose.connection;
    autoIncrement.initialize(database.db);
    database.mongoose =mongoose;
    
    database.db.on('disconnected', function(){
        dbo.collection("sessions").drop(function(err, delOK) {
            if (err) throw err;
            if (delOK) console.log("Collection deleted");
            db.close();
          });
    });
    
    createSchema(app, config);
};

var createSchema = function(app, config){
    for(var i = 0; i < config.db_schemas.length; i++){
        var curItem = config.db_schemas[i];
        var curSchema = require(curItem.file).createSchema(mongoose);
        
        curSchema.plugin(autoIncrement.plugin, {
            model: curItem.modelName, field: 'number', startAt: 1, increment: 1
        });
        
        var curModel = mongoose.model(curItem.collection, curSchema);
        
        database[curItem.schemaName] = curSchema;
        database[curItem.modelName] = curModel;
    }
    
    app.set('database', database);
}

module.exports = database;