var Schema = {};

Schema.createSchema = function(mongoose){
    var NoticeSchema = mongoose.Schema({
        number: {type: Number, requied: true, unique: true},
        name: {type: String, index: 'hashed'},
        title: {type: String, required: true},
        content: {type: String},
        created_at:{type:Date, index: {unique: false}},
        updated_at:{type:Date, index: {unique: false}, 'defualt': Date.now()}
    });
    
    NoticeSchema.static('findByNo', function(number, callback){
       return this.find({number: number}, callback); 
    });
    
    NoticeSchema.static('findAll', function(callback){
       return this.find({ }, callback); 
    });
    
    console.log('NoticeSchema 정의 완료.');
    
    return NoticeSchema;
}

module.exports = Schema;