import express from "express";
import { 
    createUser, 
    getUsers, 
    getUserById, 
    updateUser,
    getCurrentUser, 
    deleteUser 
} from "../controllers/Users.js";

import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/users/current',verifyUser , getCurrentUser);
router.post('/users', verifyUser , adminOnly,createUser);
router.get('/users', verifyUser  ,getUsers);
router.get('/users/:uuid', verifyUser ,getUserById);
router.patch('/users/:uuid', verifyUser,updateUser);
router.delete('/users/:uuid', verifyUser, adminOnly , deleteUser);

export default router;
