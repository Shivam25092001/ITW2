import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
import usersRoute from "./routes/userRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", usersRoute);

export default app;