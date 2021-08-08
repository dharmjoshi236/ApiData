const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ApiModel = require("./src/models/model");
const port = process.env.PORT || 3000

// middlewares
app.use(express.json());
app.use(express.urlencoded());

// Connect Mongodb Atlas
mongoose.connect('mongodb+srv://dharmtest:1Qazzaq1@cluster0.zqeh6.mongodb.net/test',{useNewUrlParser:true, useUnifiedTopology:true,useCreateIndex:true}).then(()=>{
    console.log("Connection succesful")
}).catch((e)=>{
    console.log("conncetion not succesful")
})

// routes

    //   Post request to get the data
app.post('/', async (req,res)=>{
    const newdata = await new ApiModel(req.body)
    newdata.save().then(()=>{
        res.send('Data Succesfully added '+newdata)
    }).catch((e)=>{
        res.status(500).send("Something wrong happened")
    })
})

    //   get request to get all datas
app.get('/',async(req,res)=>{
    try{
    const getdata = await ApiModel.find({})
    res.send(getdata);
    }catch{
        res.status(400).send('dosent get the data something went wrong')
    }
})

    // get request to get only one data using id
app.get('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const getonedata = await ApiModel.findById(id)
        res.send(getonedata)

    }catch{
         res.status(400).send("Unable to get the request")
    }
})    

    // patch request to update the data
app.patch('/:id', async (req,res)=>{
    try{
        const id = req.params.id
        const updatedata = await ApiModel.findByIdAndUpdate(id,req.body,{new:true})
        res.send('Data Updation Succesfull      '+updatedata)

    }catch{
           res.status(400).send("Data Updation Unsuccesfull")
    }
})    

    // delete request to delete the data
app.delete('/:id',async(req,res)=>{
    try{

        const id = req.params.id
        const deletedata = await ApiModel.findByIdAndDelete(id)
        res.send("The delete data is    "+deletedata);
    }catch{
        res.status(400).send("Data Deletion unsuccesful")
    }
})    
// Server Listening
app.listen(port,()=>{
    console.log("Succesful listening on port");
})