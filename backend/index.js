const express = require("express");
const urlRoute = require("./routes/url.route.js");
const cors = require('cors');
const { connectionToMongodb } = require("./DB/DBCOnnection.js");

const app = express();
const PORT = process.env.PORT || 8001;

connectionToMongodb().then(() => console.log("MONGODB CONNECTED SUCCESSFULLY"));
app.use(cors({
  origin: 'http://localhost:5173' // Replace with your React app's URL
}));
app.use(express.json())

app.use("/url", urlRoute);


app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
