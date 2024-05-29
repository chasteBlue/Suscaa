import Appointments from "../models/AppointmentModel.js";
import Users from "../models/UserModel.js";
import { Op } from "sequelize";


export const createAppointment = async (req, res) => {
    const { name, degree, school_year, student_id, address_city, address_street, reason } = req.body;

    console.log("Request body:", req.body);

    try {
        await Appointments.create({
            name: name,
            degree: degree,
            school_year: school_year,
            student_id: student_id,
            address_city: address_city,
            address_street: address_street,
            reason: reason,
            status: 'Pending',
            userId: req.userId, // Retrieve userId from session
        });
        res.status(201).json({ msg: "Appointment created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAppointments = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await Appointments.findAll({
                include: [{
                    model: Users,
                    attributes:['name', 'email'],
                }]
            });
        } else {
            response = await Appointments.findAll({
                where: {
                    userId: req.userId
                },
                include: [{
                    model: Users,
                    attributes:['name', 'email'],
                }]
            });
        }
        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointments.findOne({
            where: { uuid: req.params.uuid }
        });
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        let response;
        if (req.role === "admin") {
            response = await Appointments.findOne({
                attributes:['uuid','name','reason','status'],
                where: { uuid: req.params.uuid }, // Use UUID for query
                include: [{
                    model: Users,
                    attributes:['name', 'email'],
                }]
            });
        } else {
            response = await Appointments.findOne({
                attributes:['uuid','name','reason','status'],
                where: {
                    [Op.and]:[{ uuid: req.params.uuid },{ userId: req.userId }]
                },
                include: [{
                    model: Users,
                    attributes:['name', 'email'],
                }]
            });
        }
        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update appointment (example for admin use)
export const updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointments.findOne({
            where: { uuid: req.params.uuid }
        });
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        const { name, degree, school_year, student_id, address_city, address_street, reason } = req.body;

        if (req.role === "admin") {
            await Appointments.update(
                { name, degree, school_year, student_id, address_city, address_street, reason },
                { where: { uuid: req.params.uuid } }
            );
        } else {
            if (req.userId !== appointment.userId) {
                return res.status(403).json({ msg: "Access Forbidden" });
            }
            await Appointments.update(
                { name, degree, school_year, student_id, address_city, address_street, reason },
                { where: { uuid: req.params.uuid, userId: req.userId } }
            );
        }
        res.status(200).json({ msg: "Appointment Updated Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete appointment
export const deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointments.findOne({
            where: { uuid: req.params.uuid }
        });
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        
        if (req.role === "admin") {
            await Appointments.destroy(
                { where: { uuid: req.params.uuid } }
            );
        } else {
            if (req.userId !== appointment.userId) {
                return res.status(403).json({ msg: "Access Forbidden" });
            }
            await appointment.destroy(); // Use destroy() on the instance
        }
        res.status(200).json({ msg: "Appointment Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

