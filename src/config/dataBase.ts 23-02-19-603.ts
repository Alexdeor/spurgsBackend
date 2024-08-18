import mysql from 'mysql2';


require('dotenv').config();


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
})


connection.connect((err)=>{
    if(err){
        console.error('Error connecting to MYSQL:', err.stack);
        return; 
    }
    console.log('Connected to MySQL as id' + connection.threadId); 
});

const createUserTable=`
CREATE TABLE IF NOT EXISTS users(
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(255) NOT NULL,
hash VARCHAR(255) NOT NULL,
salt VARCHAR(255) NOT NULL
)`

connection.query(createUserTable, (err, results)=>{
    if(err){
        console.error('Error creating users table:', err.stack)
        return;
    }
    console.log('Users table created or already exists')
});

export const insertUser = (username: string, hash: string, salt: string) => {
    const query = 'INSERT INTO users (username, hash, salt) VALUES (?,?,?)';
    connection.query(query, [username, hash, salt], (err,results: mysql.ResultSetHeader)=> {
            if(err){
                console.error('Error inserting user:',err.stack);
                return;
            }
            console.log('User inserted with ID:', results.insertId)
    });
};


export default connection;