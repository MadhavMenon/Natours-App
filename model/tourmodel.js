const mongoose = require('mongoose');
const slugify = require('slugify');
const tourSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'A tour must have a name'],
        unique: true,
        trim: true
        },
    duration: {
        type: Number,
        required: [true, 'a tour must have duration']
    },    
    maxGroupSize: {
        type: Number,
        required: [true, 'a tour must have group size']
    },
    difficulty:{
        type: String,
        required: [true, 'tour should have difficulty']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity:{
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    price:{ type: Number,
            required: [true, 'A tour must have a price']
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true,
        required: [true, 'a tour must have a summary']
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'a tour must have a cover image']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date]
}, {
    toJSON:{ virtuals: true},
    toObject: { virtuals: true }
});
//DOCUMENT MIDDLEWARE RUNS BEFORE .save(), .create(),.insertMany()
tourSchema.pre('save', function(next){
    this.slug = slugify(this.name, { lower: true });
    next();
})

tourSchema.virtual('durationWeeks').get(function(){
    return this.duration / 7;
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;