const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  cors = require("cors");

app.use(express.json({limit:"50mb"}))
app.use(cors());
app.listen(port, () => console.log("Backend server live on " + port));

const mongoose = require("mongoose")


mongoose.set('strictQuery',false)
const database = module.exports =()=>{
  const connectionParams = {
    useNewUrlParser:true,
    useUnifiedTopology:true
  }
  try{
    mongoose.connect('mongodb+srv://Kowshik:Kowshik333*@cluster0.wkdkeir.mongodb.net/TRAINS?retryWrites=true&w=majority',connectionParams)
    console.log("database connected successfully")
  }catch(err){
console.log(err)
console.log("couldn't connect database")
  }
}



database()
function generateRandomAlphanumeric(length) {
  const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
    result += alphanumericChars.charAt(randomIndex);
  }

  return result;
}
const Userschema = new mongoose.Schema({
  company:String,
  owner:String,
 rollno:String,
 email:String,
 accesscode:String,
 clientID:String,
 clientSecret:String,
token_type:String,
access_token:String,
  expires_in: Date
})
const LoginSchema=new mongoose.Schema({
    trainNumber:String,
train_name:String,
DepartureTime:Object,
seatsAvailable:Object,
price:Object,
delayedBy:String
})
const User1 = mongoose.model('trains',Userschema)
const User2 = mongoose.model('schedules',LoginSchema)
app.post("/train/register",(req,res)=>{
let user={
    company:req.body.company,
    owner:req.body.owner,
    rollno:req.body.rollno,
    email:req.body.email,
    accesscode:req.body.access,
    clientID:generateRandomAlphanumeric(30),
    clientSecret:generateRandomAlphanumeric(10)

}
User1.find({company:req.body.company},function(err,docs){
    if(docs.length==0){
if(req.body.access=="nSFqRI"){
    User1.insertMany(user).then(()=>console.log("Added to trains"))
let responsedata={
    company:user.company,
clientID:user.clientID,
clientSecret:user.clientSecret
}
res.status(200).json({ message: "User Registered successfully", data: responsedata});
}else{
    res.status(202).json({message:"Invalid Access Code"})
}
    }
    else{
        res.status(202).json({message:"User Already Registered"})
    }

})

})
app.post("/train/auth",(req,res)=>{

    User1.findOneAndUpdate({clientID:req.body.clientID,clientSecret:req.body.clientSecret},{  $set: {
      token_type: 'bearer',
      access_token: generateRandomAlphanumeric(50),
      expires_in: new Date(Date.now() + 4 * 60 * 60 * 1000)
    }},{ new: true },function(err,docs){
      if(docs==null||docs==undefined||docs.length==0){
          res.status(202).json({message:"You Haven't registered"})
      }
      else{
let user={
    token_type:docs.token_type,
    access_token:docs.access_token,
    expires_in:docs.expires_in
}
      res.status(200).json({message:"You are authorised",data:user})   
}
    })
})
app.get("/train/trains",(req,res)=>{
    User2.find({},function(err,docs){
     res.send({docs:docs})
    })
 

})
app.get("/train/trains/:id",(req,res)=>{
    User2.find({trainNumber:req.params.id},function(err,docs){
     res.send({docs:docs})
    })
 

})