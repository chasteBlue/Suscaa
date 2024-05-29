import express from "express";
import { 
    createAppointment, 
    getAppointments, 
    getAppointmentById, 
    updateAppointment, 
    deleteAppointment 
} from "../controllers/Appointments.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.post('/appointments', verifyUser, createAppointment);
router.get('/appointments', verifyUser,getAppointments);
router.get('/appointments/:uuid', verifyUser,getAppointmentById);
router.patch('/appointments/:uuid', verifyUser,updateAppointment);
router.delete('/appointments/:uuid', verifyUser,deleteAppointment);

export default router;
