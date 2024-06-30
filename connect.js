const mongoose=require('mongoose')

async function connecttoMongoDb(url){
    return mongoose.connect(url).then(()=> console.log("mongo db connected")).catch(err => console.log("error",err))
}

module.exports={
    connecttoMongoDb,
}