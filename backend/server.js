const express = require('express');
const mongoose = require('mongoose')
const cors = require("cors")
const bodyParser = require('body-parser')
const dotenv = require('dotenv');


const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

dotenv.config()

mongoose.set('strictQuery', true);

const connectDB = async() => {
  try {
      const conn = await mongoose.connect(process.env.MONGO_URI );
      console.log(`Mongo Connected ${conn.connection.host}`);

  } catch (error) {
      console.log(`Error : ${error.message}`);
      process.exit();
  }
};
connectDB()

app.get('/', (req, res) => {
  res.send('Hello, World! This is my Express server!');
});


app.use('/contact' , require('./routes/contactRoutes'))
app.use('/apply', require('./routes/applyRoutes'))
app.use('/class', require('./routes/classRoute'))
app.use('/subject', require('./routes/subjectRoute'))
app.use('/course', require('./routes/courseRoute'))
app.use('/student', require('./routes/studentRoutes'))
app.use('/superadmin' , require('./routes/superAdminRoute'))
app.use('/teacher', require('./routes/teacherRoutes'))
app.use('/expense', require('./routes/expenseRoutes'))
app.use('/note', require('./routes/noteRoutes'))





app.listen(8080, () => {
  console.log(`Server is running on Port 8080`);
});