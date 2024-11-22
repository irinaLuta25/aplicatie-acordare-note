const express=require('express');

const app=express();
const port=4848;
const {db}=require("./models");

// app.use("/api",router);

app.get('/reset',(req,res)=>{
    db
    .sync({force:true})
    .then(()=>{
            res.status(200).send("Db reset complete!")
        })
    .catch((err)=>{
            res.status(500).send({message:"Db reset error", err:err.message})
        });
})

app.listen(port,()=>{ //se intampla in terminal
    console.log(`Server is running on ${port}`);
    console.log(`http://localhost:${port}`);
})

