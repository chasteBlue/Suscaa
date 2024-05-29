import express from "express";
import { 
    createMeeting, 
    getMeetings, 
    getMeetingById, 
    updateMeeting, 
    deleteMeeting 
} from "../controllers/Meetings.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.post('/meetings', verifyUser, createMeeting);
router.get('/meetings', verifyUser, getMeetings);
router.get('/meetings/:uuid', verifyUser, getMeetingById);
router.patch('/meetings/:uuid', verifyUser, updateMeeting);
router.delete('/meetings/:uuid', verifyUser, deleteMeeting);

export default router;
