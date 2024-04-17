const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const exphbs = require('express-handlebars');
const cors = require('cors')

connectDb();

const app = express();

const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');

app.use(cors());
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());


app.use("/api/Movies", require("./routes/movieRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
