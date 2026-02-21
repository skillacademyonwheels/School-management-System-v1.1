import dotenv from "dotenv";
import app from "./app.js"

//db Connection
import connectDB from "./db/db-connect.js"



dotenv.config({
    path: "./.env",
});
const port = process.env.PORT || 3000;
// const port = 3000;



// connectDB()
//     .then(() => {
//         app.listen(port, () => {
//             console.log(`Example app listening on port http://localhost:${port}`)
//         });
//     })
//     .catch((err) => {
//         console.error("MongoDB Connection Error", err)
//         process.exit(1)
//     })

async function start() {
    await connectDB(process.env.MONGO_URI);
    
    app.listen(port, () => {
        console.log(`✅ Server running on http://localhost:${port}`);
        console.log("AdminJS:", `http://localhost:${port}/admin`);
    });
}

start().catch((err) => {
    console.error("❌ Failed to start:", err);
    process.exit(1);
});




