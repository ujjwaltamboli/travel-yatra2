import express from "express";
import { signUpcontroller } from "../controller/auth.controller.js"
import { signIncontroller } from "../controller/auth.controller.js";



const router=express.Router();
router.use("/signup",signUpcontroller);
router.use("/signin",signIncontroller);
export default router