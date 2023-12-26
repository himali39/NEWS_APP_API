const http = require("http");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./Api/config/dbConnection");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**admin route */
const adminRoutes = require("./Api/routes/admin");
app.use(adminRoutes);

/*App route */
const userRoute = require("./Api/routes/app");
app.use(userRoute);

/** database connection  */
connectDB();

/**UPLOAD FILE */
app.use(express.static(path.join(__dirname, "./src/Api/public/")));

/**create server */
const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  console.log(" Server listning port number", +process.env.PORT);
});
