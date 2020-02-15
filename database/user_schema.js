var Schema = {};

Schema.createSchema = function(mongoose){
    var UserSchema = mongoose.Schema({
        number: {type: Number, requied: true, unique: true},
        id: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        name: {type: String, index: 'hashed'},
        age: {type: Number, 'default': -1},
        birth: {type: Date, index:{unique: false}, 'default': Date.now},
        phone:{type: String, index: 'hashed'},
        created_at:{type:Date, index: {unique: false}, 'defualt': Date.now},
        updated_at:{type:Date, index: {unique: false}, 'defualt': Date.now}
    });
    
    UserSchema.static('findById', function(id, callback){
       return this.find({id: id}, callback).limit(1); 
    });
    
    UserSchema.static('findByNo', function(number, callback){
       return this.find({number: number}, callback); 
    });
    
    UserSchema.static('findAll', function(callback){
       return this.find({ }, callback); 
    });
    
    console.log('UserSchema 정의 완료.');
    
    return UserSchema;
}

module.exports = Schema;