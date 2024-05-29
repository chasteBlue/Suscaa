import Appointments from "../models/AppointmentModel.js";
import Users from "../models/UserModel.js";
import { Op } from "sequelize";

// Create a new meeting
export const createMeeting = async (req, res) => {
    const { name, degree, school_year, student_id, address_city, address_street, reason } = req.body;

    console.log("Request body:", req.body); // Log request body for debugging

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
        res.status(201).json({ msg: "Meeting created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Retrieve all meetings
export const getMeetings = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await Appointments.findAll({
                include: [{
                    model: Users,
                    attributes: ['name', 'email'],
                }]
            });
        } else {
            response = await Appointments.findAll({
                where: {
                    userId: req.userId
                },
                include: [{
                    model: Users,
                    attributes: ['name', 'email'],
                }]
            });
        }
        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Retrieve a meeting by ID
export const getMeetingById = async (req, res) => {
    try {
        const meeting = await Appointments.findOne({
            where: { uuid: req.params.uuid }
        });
        if (!meeting) {
            return res.status(404).json({ message: "Meeting not found" });
        }
        let response;
        if (req.role === "admin") {
            response = await Appointments.findOne({
                attributes: ['uuid', 'name','degree', 'student_id', 'school_year', 'address_city','address_street', 'reason', 'status', 'counselors', 'date_counsel'],
                where: { uuid: req.params.uuid }, 
                include: [{
                    model: Users,
                    attributes: ['name', 'email'],
                }]
            });
        } else {
            response = await Appointments.findOne({
                attributes: ['uuid', 'name','degree', 'student_id', 'school_year', 'address_city','address_street', 'reason', 'status', 'counselors', 'date_counsel'],
                where: {
                    [Op.and]: [{ uuid: req.params.uuid }, { userId: req.userId }]
                },
                include: [{
                    model: Users,
                    attributes: ['name', 'email'],
                }]
            });
        }
        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a meeting
export const updateMeeting = async (req, res) => {
    try {
        const meeting = await Appointments.findOne({
            where: { uuid: req.params.uuid }
        });
        if (!meeting) {
            return res.status(404).json({ message: "Meeting not found" });
        }

        const { status, counselors, date_counsel } = req.body;

        if (req.role === "admin") {
            await Appointments.update(
                { status, counselors, date_counsel },
                { where: { uuid: req.params.uuid } }
            );
        } else {
            if (req.userId !== meeting.userId) {
                return res.status(403).json({ msg: "Access Forbidden" });
            }
            await Appointments.update(
                { status, counselors, date_counsel },
                { where: { uuid: req.params.uuid, userId: req.userId } }
            );
        }
        res.status(200).json({ msg: "Meeting Updated Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a meeting
export const deleteMeeting = async (req, res) => {
    try {
        const meeting = await Appointments.findOne({
            where: { uuid: req.params.uuid }
        });
        if (!meeting) {
            return res.status(404).json({ message: "Meeting not found" });
        }

        if (req.role === "admin") {
            await Appointments.destroy({ where: { uuid: req.params.uuid } });
        } else {
            if (req.userId !== meeting.userId) {
                return res.status(403).json({ msg: "Access Forbidden" });
            }
            await meeting.destroy(); // Use destroy() on the instance
        }
        res.status(200).json({ msg: "Meeting Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
