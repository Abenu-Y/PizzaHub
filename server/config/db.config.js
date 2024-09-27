
const { Pool } = require('pg');


// Prepare the db parameters
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 5432, // Default port for PostgreSQL is 5432
    max: 10, // Connection limit
    idleTimeoutMillis: 30000, // 30 seconds before closing idle clients
  };


//   {
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     port: process.env.DB_PORT,
//     max: 10, // Connection limit
// }

const dbConnection = new Pool(dbConfig)


// Function to test the connection
async function testConnection() {
    try {
        const client = await dbConnection.connect();
        console.log('Connected to the database successfully.');
        client.release(); // Release the client back to the pool
    } catch (err) {
        console.error('Unable to connect to the database:', err.message);
        process.exit(1); // Exit the process with a failure code
    }
}

testConnection()
// Example query with promise-based execution
// dbConnection
//   .query("SELECT 'test' AS test_column")
//   .then((result) => {
//     console.log(result.rows); // Output the result
//   })
//   .catch((err) => {
//     console.error('Error executing query', err.message);
//   });


// Function to execute SQL queries asynchronously
async function query(sql, params) {
    try {
        // Execute the query and destructure the result into rows and fields
        const rows = await dbConnection.query(sql, params);

        // Log the query results for debugging
        console.log('Query result:', rows);
        
        // Return rows (results) for the caller to handle
        return rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error; // Throw error for the caller to handle
    }
}

module.exports = {query}