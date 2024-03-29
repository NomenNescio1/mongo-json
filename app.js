const express = require('express');
const mongo = require('mongoose');

const app = express();

var schema = mongo.Schema({
    name: String,
    price: Number    
});

var Products = mongo.model('Products', schema);
mongo.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-json', {useNewUrlParser:true,  useUnifiedTopology: true });
mongo.connection.on('error', (e)=>{console.error(e)});

app.get('/products', async (req, res)=>{
    const products = await Products.find({});
    res.set('Content-Type', 'application/json');
    res.json(products);
});
app.listen(3000, () => console.log('Listening on port 3000!'));
