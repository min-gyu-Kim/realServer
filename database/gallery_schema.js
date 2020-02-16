 var Schema = {};

Schema.createSchema = function(mongoose){
    var GallerySchema = mongoose.Schema({
        number: {type: Number, required: true, unique: true },
        name: {type: String, required: true },
        img_url: {type: String},
        public_id: {type: String},
        date: {type: Date, 'default': Date.now},
        title: {type: String, required: true},
        views: {type: Number, default: 0}
    });
    
    GallerySchema.static('findByNumber', function(num, callback){
        return this.find({number: num}, callback);
    });
    
    GallerySchema.static('findByName', function(name, callback){
       return this.find({name: name}, callback); 
    });
    
    GallerySchema.static('findAll', function(callback){
       return this.find({ }, callback); 
    });
    
    GallerySchema.static('findMax', function(callback){
        return this.find({}).sort().limit(1, callback);
    })
    
    return GallerySchema;
}

module.exports = Schema;