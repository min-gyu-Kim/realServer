 var Schema = {};

Schema.createSchema = function(mongoose){
    var PostSchema = mongoose.Schema({
        number: {type: Number, required: true, unique: true },
        name: {type: String, required: true },
        content: {type: String},
        date: {type: Date, 'default': Date.now},
        title: {type: String, required: true},
        views: {type: Number, default: 0}
    });
    
    PostSchema.static('findByNumber', function(num, callback){
        return this.find({number: num}, callback);
    });
    
    PostSchema.static('findByName', function(name, callback){
       return this.find({name: name}, callback); 
    });
    
    PostSchema.static('findAll', function(callback){
       return this.find({ }, callback); 
    });
    
    PostSchema.static('findMax', function(callback){
        return this.find({}).sort().limit(1);
    })
    
    return PostSchema;
}

module.exports = Schema;