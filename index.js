const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app=express();
const port= process.env.PORT||5000;


app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('hello todo')
})



const uri = "mongodb+srv://todoapp:FhPGqtOhcitK89hf@cluster0.ljqvu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect()
        const todoCollection=client.db('todoApp').collection('item');
       
        app.get('/myitem',async(req,res)=>{
            const query={}
            const cursor= todoCollection.find(query)
            const result =await cursor.toArray();
             res.send(result)
        })
      


           
           app.post('/additem', async(req,res)=>{
            const additem= req.body;
            console.log(additem)
            const result= await todoCollection.insertOne(additem)
            res.send(result)
        })


     



 
        app.delete('/additem/:id', async(req,res)=>{
            const id= req.params.id;
            const qurey={_id:ObjectId(id)}
            const result= await todoCollection.deleteOne(qurey);
            res.send(result)
           })





    }
    finally{
        
    }





}run().catch(console.dir)




app.listen(port)