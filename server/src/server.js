require('dotenv').config()

const express = require('express');
const cors = require('cors');
const leadRoutes = require("./routes/leadRoutes");

const app = express();

app.use(cors({origin: "http://localhost:5173"}));
app.use(express.json());


app.use("/api/leads", leadRoutes);

app.get('/', (req, res) => {
    res.json({
        message: "Ster Robotics Automation API",
    })
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running at Port: ${process.env.PORT}`)
})