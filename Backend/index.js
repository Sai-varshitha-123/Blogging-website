const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host : 'localhost',
    user:"root",
    password:"S@i32002",
    database:"blogger"

})


const app = express();

app.use(cors());
app.use(bodyParser.json());


app.post('/register', async (req, res) => {
    const { displayname, email, name, password } = req.body;


    try {
       // res.json({ displayname, email, name, password });
        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const insertQuery = 'INSERT INTO register (displayname, email, name, password) VALUES (?, ?, ?, ?)';
        connection.query(insertQuery, [displayname, email, name, hashedPassword], (err, result) => {
            if (err) {
                res.json({message : `Error registering user:${err}`});
                res.status(500).json({ message: 'Failed to register user' });
                return;
            }

            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to register user' });
    }
});


//create blog
app.post('/createblog',(req ,res)=>{
    const {title , name , content} = req.body;

    try{
    const insertQuery = 'INSERT INTO content (title, name, content) VALUES (?, ?, ?)';
        connection.query(insertQuery, [title, name, content], (err, result) => {
            if (err) {
                
                res.status(500).json({ message: 'Failed to create blog' });
                return;
            }

            res.status(201).json({ message: 'Blog successfully created' });
        });
    } catch (error) {
        res.status(500).json({ message: `Failed to create blog ${error}` });
    };
})

// Get Blogs
app.get('/blogs',(req,res)=>{

    connection.query(
        'SELECT * FROM content',
        async (err, results, fields) => {
          if (err) {
            console.error('Error querying database:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }
    
          if (results.length > 0) {
                res.status(200).json(results);       
          } else {
            res.status(401).json({ error: 'Invalid credentials' });
          }
        }
      );

})


//Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    
    connection.query(
      'SELECT * FROM register WHERE email = ?',
      [email],
      async (err, results, fields) => {
        if (err) {
          console.error('Error querying database:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
  
        if (results.length > 0) {
           const isPasswordMatch = await bcrypt.compare(password,results[0].password);
           
           

            if(isPasswordMatch){
                res.status(200).json({ message: 'Login successful',status:isPasswordMatch});
            }
            else{
                res.status(400).json({message:"Password is not matched",status:isPasswordMatch});
            }
          
          
        } else {
          
          res.status(401).json({ error: 'Invalid credentials' });
        }
      }
    );
  });

const PORT =5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});