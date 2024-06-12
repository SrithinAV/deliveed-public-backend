import  express  from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config.js'
import cartItemRoute from "./routes/cartItemRoute.js";
import orderRoute from "./routes/orderRoute.js";
import {dirname} from "path";
import { fileURLToPath } from "url";

//app config

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT;

//middleware
app.use(express.json())
app.use(cors())


//DB Connection
connectDB();

//API endpoint
app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'));
app.use("/api/user",userRouter)
app.use("/api/cart",cartItemRoute)
app.use("/api/order",orderRoute)



app.get("/",(req,res)=>
{
    res.send("API working")
})

app.listen(port,()=>
{
    console.log(`server started on port  ${port}`)
})


