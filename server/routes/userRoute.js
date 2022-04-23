import express from "express";
import  {Login, registerUser, Logout} from "../controllers/userControl.js";

const router = express.Router();

router.post("/login", Login);
router.post("/register", registerUser);
router.get("/logout", Logout);

export default router;