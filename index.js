const { MongoClient } = require('mongodb');
const express = require('express')
const cors = require('cors')
require('dotenv').config();
// const admin = require("firebase-admin");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jqqom.mongodb.net/go-skate?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri)

async function run() {
    try {
        await client.connect();
        const appointmentCollection = client.db('go-skate').collection('skateboards');
        const testimonials = client.db('go-skate').collection('clients');


        app.get('/products', async (req, res) =>{
            
            const cursor = await appointmentCollection.find({}).toArray();
            res.json(cursor)
          
        }) 

         // data single get 
        //  app.get('/datas/:id', async (req, res) => {
        //     const email = req.params.email
        //     console.log(id)
        //     const quary = { email: email }
        //     const result = await appointmentCollection.findOne(quary).toArray()
        //     res.send(result)
        // })

          app.get('/clients', async (req, res) =>{
            
            const cursor = await testimonials.find({}).toArray();
            res.json(cursor)
          
        })

         // User Manage data get
         app.get('/tourdatas', async (req, res) => {
            const inter = tourInform.find({})
            const user = await inter.toArray()
            res.send(user)
        })

            // data single get 
            app.get('/datas/:id', async (req, res) => {
                const id = req.params.id
                console.log(id)
                const quary = { _id: ObjectId(id) }
                const result = await myObjects.findOne(quary)
                res.send(result)
            })
            
        // const adminCollection = client.db('doctorsPortal').collection('admin');
        // console.log('db connected')
        // app.post('/addAppointment', async (req, res) => {
        //     const appointment = req.body;
        //     const result = await appointmentCollection.insertOne(appointment)
        //     res.json(result.acknowledged)
        // })

        // app.get('/appointments', async (req, res) => {
        //     // console.log(req.email)
        //     // console.log(req.query.email)
        //     if (req.email && req.email === req.query.email) {
        //         const cursor = appointmentCollection.find({})
        //         const appointments = await cursor.toArray();
        //         res.json(appointments)
        //     } else {
        //         res.status(401).json([{ message: 'Unauthorized' }])
        //     }

        // })
        // app.get('/isAdmin', async (req, res) => {
        //     const email = req.query.email;
        //     console.log(email);
        //     if (email) {
        //         const cursor = adminCollection.find({ email: email })
        //         const isAdmin = await cursor.toArray();
        //         res.send(isAdmin.length > 0);
        //     }

        // })
    }
    finally {

    }
}

run().catch(console.dir)

app.get('/', (req, res) => {
    res.send("Hello form node Surf Server");
})

app.listen(port, () => {
    console.log('listen to port', port)
});
