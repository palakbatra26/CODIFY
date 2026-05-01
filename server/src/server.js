import dotenv from 'dotenv'
dotenv.config();

import app from "./app.js";
import conn_db from "./config/db.js";
conn_db(); 

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server is runing")
});

