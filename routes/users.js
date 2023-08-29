import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controller/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkauthencation", verifyToken, (req,res,next)=>{
    res.send("hlo user you are loged in");
})

router.get("/checkuser/:id",verifyUser, (req,res,next)=>{
    res.send("hlo user you are loged in and u can delete your account");
})
router.get("/checkadmin/:id",verifyAdmin, (req,res,next)=>{
    res.send("hlo Admin you are logedin and u can delete any account");
})

// UPDATE
router.put("/:id",verifyUser, updateUser);
// DELETE
router.delete("/:id",verifyUser, deleteUser);
// GET
router.get("/:id",verifyUser, getUser);
// GET ALL
router.get("/", verifyAdmin,getUsers);


export default router;