const { query } = require('../config/db.config');

//  ` i have a sql file already prepared and I want to read the file here
//  ` so I will use the fs module to read the sql file 

const fs = require('fs');

const path = require('path');

// ` write a function to create a database tables. This function will be installed into install services file

async function install () {
    // ` create a variable to hold the path to sql file by including __dirname(current path start fom C-file)
    const sqlFilePath = path.join(__dirname, 'sql/setup_queries.sql');
    // console.log(sqlFilePath);

    // ` Temporary variable used to store all queries, and the return message in query

    let queries = []
    let finalMessage = {}
    let tempLine = '' //` track each line in sql file and check whether it's comment or code
    try {
    // ` read the sql file
    const fileContent = fs.readFileSync(sqlFilePath, 'utf-8');
    const lines = fileContent.split('\n');
    
    // ` create a promise to handle the async reading of the file and queries of teh variable
    const executed = await new Promise((resolve, reject) => {
        // ` loop through the lines of the sql file
        lines.forEach(line => {
            // ` if the line starts with '--' or is empty, ignore it it might be a comment
            if (line.trim().startsWith('--') || line.trim() === '') {
                return
            }
            // ` if the line ends with '\n' (end of a line), add the previous line and the current line to the queries array and reset tempLine
            tempLine += line

            // ` if the line ends with ';' (end of a query), add it to the queries array and reset tempLine
            if (line.trim().endsWith(';')) {
                // ` prepare individual query
                const sqlQuery = tempLine.trim()
                // ` add the query(table create code) to the queries array i prepared 
                queries.push(sqlQuery)
                // ` reset tempLine for the next query(so after it create the first it'll create the second one)
                tempLine = ''
            }
        })

        // ` resolve the promise with the queries array
        resolve("Queries are added to the list ")
    })
    // ` loop through the queries and execute them one by one asynchronously
    for (let i= 0 ; i< queries.length; i++) {
        try {
            // ` execute the queries in query i prepared in dbConfig file
          const result =  await query(queries[i]);
          console.log("Table Created");
        } catch (error) {
            // ` if an error occurs during the execution, add error message to final message
            finalMessage.message = "Not all tables are not created"
            console.error("Error creating table:", error.message);
        }
    }

    // # on the above loop the final message is created when error is occured
    // ` prepare a final  message to  return to install controller
    if(!finalMessage.message){
        finalMessage.message = "All tables are created successfully"
        finalMessage.status =  200
    } else{
        finalMessage.status =  500
    }

}catch (error) {
    console.error("Error reading the SQL file:", error.message);
    finalMessage.message = "Error reading the SQL file";
    finalMessage.status = 500;
}
// ` return the final message 

return finalMessage;
}

// ` install service will be exported and used in the install controller

module.exports = {install};