import express from "express";
import { Login, Me, Logout, Register } from "../controllers/Auth.js";

const router = express.Router();

router.post('/login', Login);
router.get('/me', Me);
router.delete('/logout', Logout);
router.post('/register', Register); 

export default router;
