require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoute");
const facultyRoutes = require("./routes/facultyRoutes");
const reviewRoutes = require("./routes/rivewRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const uri=`mongodb+srv://facultyMarking:cWY361RXx5xzumEE@cluster0.uaiap.mongodb.net/facultyMarking?retryWrites=true&w=majority&appName=Cluster0`

async function run(){
    try{
        await mongoose.connect(uri);
         mongoose.set("bufferCommands", false);
    console.log("MongoDB connected");
    }
    finally{

    }
  
}
run()

app.use("/api/users", userRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/reviews", reviewRoutes);

const PORT =5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
