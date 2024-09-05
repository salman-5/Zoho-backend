const { get } = require('express/lib/response');
const mongoose=require('mongoose');

const User = require('./models/user');

const uri = "mongodb+srv://crud:iy0qVSYtWNLIdDGb@atlascluster.5oi0mon.mongodb.net/test?retryWrites=true&w=majority&appName=AtlasCluster";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);

const createUser= async (req,res,next) =>{
    const newUser = new User({
        username: req.body.username,
        pass: req.body.pass,
        secret : req.body.secret
    });
    const result = await newUser.save();
    console.log(newUser);
    res.json(result);
};

const getUser = async (req,res,next)=>{
    const username = req.body.username
    //console.log(req);
    const users = await User.find().exec();
    users.map((e) => {
        if (e.username === username && e.pass === req.body.pass) {
             res.send("success");
    
        }
    })
   // res.send("failed")
//res.json(users);
//console.log(users);
};



exports.createUser=createUser;
exports.getUser=getUser;



