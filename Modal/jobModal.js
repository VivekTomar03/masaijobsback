const mongoose = require("mongoose")

const jobSchema = mongoose.Schema({
    CompanyName:String,
    City:String,
    Location:String,
    Role:String,
    Level:String,
    Position:String,
    Contrac:String,
    Date:Date,
    Language:String

}, {
    versionKey:false
})

const JobModal = mongoose.model("/job", jobSchema)
module.exports= {
    JobModal
}