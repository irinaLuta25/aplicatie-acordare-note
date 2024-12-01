const express=require('express');

const app=express();
const port=4848;
const {db}=require("./models");

const router = require('./routes');
const { AsyncQueueError } = require('sequelize');
app.use(express.json());
app.use("/api",router);

app.get('/reset', async(req,res)=>{
    try {
        await db.query('SET FOREIGN_KEY_CHECKS = 0'); // Dezactivează constrângerile
        await db.sync({ force: true }); // Resetează tabelele
        await db.query('SET FOREIGN_KEY_CHECKS = 1'); // Reactivează constrângerile
        res.status(200).send('Db reset complete!');
    } catch (err) {
        res.status(500).send({ message: 'Db reset error', err: err.message });
    }
})

app.listen(port,()=>{ 
    console.log(`Server is running on ${port}`);
    console.log(`http://localhost:${port}`);
})

