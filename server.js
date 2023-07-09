const express = require("express");
const errorHandler = require("./middleware/errorHandler.js");
const connectDB = require("./dbConntection.js");
const dotenv = require("dotenv").config();
connectDB()
const app = express();
app.use(express.json())

const port = process.env.PORT || 5000;

app.use('/api/contacts',require("./routes/contactRoutes.js"))
app.use('/api/users',require("./routes/userRoutes.js"))
app.use(errorHandler)

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
