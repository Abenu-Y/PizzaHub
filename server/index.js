const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000;
const { query } = require('./config/db.config')
const routes = require('./routes/index')


app.get('/',(req,res)=>{
    res.send('Hello Our Customers, This is Online Pizza Ordering App')
})

app.use(express.json())
app.use(routes)

// async function insertCar(brand, model, year) {
//     const query_statement = `INSERT INTO cars (brand, model, year) VALUES ($1, $2, $3)`;
//     const params = [brand, model, year];

//     try {
//         // Execute the query
//         const result = await query(query_statement, params);
//         // console.log('Car inserted successfully:', result);
//     } catch (error) {
//         console.error('Error inserting car:', error.message);
//     }
// }

// // Example call to the function
// insertCar('Toyota', 'Corolla', 2021);

app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`))