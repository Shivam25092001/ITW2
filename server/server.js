import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import path, {dirname} from "path";
import { fileURLToPath } from "url";
import usersRoute from "./routes/userRoute.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
//fetch data from the request  
app.use(bodyParser.urlencoded({extended:false}));  
//static folder  
app.use(express.static(path.resolve(__dirname,'public')));  


app.use("/api/v1", usersRoute);

export default app;