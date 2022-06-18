import express from "express";
import  {Login, registerUser, Logout, getUserDetails,
    forgotpass, resetpass, registerFromCSV, updatePassword,
    updateProfile, getUsers, getSingleUser, updateRole, deleteUser,
    findStudents, findTeachers, findAdmins,
    findCSEStudents, findECEStudents, findCSETeachers, findECETeachers
} from "../controllers/userControl.js";
import upload from "../middleware/upload.js";
import {isUserAuthentic, authorizeRoles} from "../middleware/auth.js";

const router = express.Router();

router.post("/login", Login);
router.post("/register", registerUser);
router.post("/uploadCSV",upload.single("file"), registerFromCSV);
router.get("/logout", Logout);

router.post("/password/forgot", forgotpass);
router.put("/password/reset/:token", resetpass);
router.put("/password/update",isUserAuthentic, updatePassword);
router.put("/me/update",isUserAuthentic, updateProfile);

router.get("/users", getUsers);
router.get("/me", getUserDetails);
router.get("/users/:id", getSingleUser);
router.put("/users/:id",isUserAuthentic, authorizeRoles("admin"), updateRole);
router.delete("/admin/users/:id",authorizeRoles("admin"), deleteUser);

router.get("/allstudents", findStudents);
router.get("/allteachers", findTeachers);
router.get("/alladmins", findAdmins);
router.get("/csestudents", findCSEStudents);
router.get("/ecestudents", findECEStudents);
router.get("/cseteachers", findCSETeachers);
router.get("/eceteachers", findECETeachers);

export default router;