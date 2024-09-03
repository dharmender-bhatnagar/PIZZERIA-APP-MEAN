var mongoClient=require('mongodb').MongoClient
var express=require('express')
var cors=require('cors')
var app=express()
 
 
app.use(express.json())
app.use(cors())
 
mongoClient.connect('mongodb://localhost:27017',(err,client)=>{
    if(err){
        console.log("error found:"+err)
    }
    else{
        console.log("database connected successfully")
        db=client.db('pizzeria')
        collection=db.collection('pizzas')
        collection1=db.collection('ingredients')
        collection2=db.collection('shoppingcart')
       
    }
})
 
 
app.post('/cart/addpizza',async(req,res)=>{
    const {data} = req.body
    console.log(data)
 
    const existingPizza = await collection2.findOne({id: data.id});
    if (existingPizza) {
       
        const updatedQuantity = existingPizza.quantity + 1;
        console.log(updatedQuantity);
        const updatedPrize = Number(existingPizza.price) + (Number(existingPizza.price)/existingPizza.quantity);
        await collection2.updateOne({ id: data.id }, { $set: { quantity: updatedQuantity, price: updatedPrize } });
        res.json({ message: 'Pizza quantity updated in the cart.' });
 
    } else {
        const newPizza = { ...data, quantity: 1 };
 
        collection2.insert(newPizza,(err,result)=>{
            if(err){
                res.send(err)
            }
            else{
                res.json({ message: 'Pizza added to the cart.' });
 
            }
        })
    }
})
 

// app.post('/cart/custom', async(req,res) => {
//     const {data} = req.body 
    
//     const existingPizza = await collection2.findOne({id: data.id});
//     if (existingPizza) {
       
//         const updatedQuantity = existingPizza.quantity + 1;
//         console.log(updatedQuantity);
//         const updatedPrize = Number(existingPizza.price) + (Number(existingPizza.price)/existingPizza.quantity);
//         await collection2.updateOne({ id: data.id }, { $set: { quantity: updatedQuantity, price: updatedPrize } });
//         res.json({ message: 'Pizza quantity updated in the cart.' });
 
//     } else {
//         const newPizza = { ...data, quantity: 1, custom:true };
 
//         collection2.insert(newPizza,(err,result)=>{
//             if(err){
//                 res.send(err)
//             }
//             else{
//                 res.json({ message: 'Pizza added to the cart.' });
 
//             }
//         })
//     }
// })
 
app.post('/cart/custom', async(req,res) => {
    const {data} = req.body 

    console.log(data);

    const update = await collection2.updateMany({},{$push: {topping: {$each: data.topping}}});
    const updateprice = await collection2.updateMany({},{$inc : {price:data.price}});
    console.log('added');
})

app.get('/getshoppingcart', async(req,res) => {
    collection2.find().toArray((err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.json(result)
        }
    })
})

 
app.delete('/cart/deletepizza/:id', async(req,res) =>{
    const pizzaId = req.params.id
    const existingPizza = await collection2.findOne({id: pizzaId});
 
    if(existingPizza){
        await collection2.deleteOne({id:pizzaId})
        res.json({message: 'Pizza deleted from the cart'})
    }
    else{
        res.json({message: 'Pizza not found'})
    }
 
})

app.delete('/cart/deletecart',async(req,res)=>{
    await collection2.deleteMany({})
    res.json({message:'Cart is Deleted'})
})
 

app.delete('/cart/decrementpizza/:id', async(req,res) => {
    const pizzaId = req.params.id
    console.log(pizzaId);
    const existingPizza = await collection2.findOne({id: pizzaId});
    const quantity = existingPizza.quantity
 
    if(quantity == 1){
        await collection2.deleteOne({id:pizzaId})
        res.json({message: 'Pizza deleted from the cart'})
    }
    else if (existingPizza) {
        const updatedQuantity = existingPizza.quantity - 1;
        console.log(updatedQuantity);
        const updatedPrize = Number(existingPizza.price) - (Number(existingPizza.price)/existingPizza.quantity);
        await collection2.updateOne({ id: pizzaId }, { $set: { quantity: updatedQuantity, price: updatedPrize } });
        res.json(updatedQuantity)
    }
    else{
        res.json({ message: 'Pizza not exist.' })
    }
})
 
 

app.post('/cart/incrementpizza/:id', async(req,res) => {
    const pizzaId = req.params.id
    const existingPizza = await collection2.findOne({id: pizzaId});
    const quantity = existingPizza.quantity
 
        const updatedQuantity = existingPizza.quantity + 1;
        console.log(updatedQuantity);
        const updatedPrize = Number(existingPizza.price) + (Number(existingPizza.price)/existingPizza.quantity);
        await collection2.updateOne({ id: pizzaId }, { $set: { quantity: updatedQuantity, price: updatedPrize } });
        res.json({ message: 'Pizza quantity increment in the cart.' });
})
 
app.get('/fetchpizza', (req, res) => {
    collection.find().toArray((err, result) => {
        if (err) {
            res.send(err)
        }
        else {
            res.json(result)
        }
    })
})
 
app.get('/fetchingredients', (req, res) => {
    collection1.find().toArray((err, result) => {
        if (err) {
            res.send(err)
        }
        else {
            res.json(result)
        }
    })
})
 


app.listen(3000,()=>console.log("server starting at 3000"))