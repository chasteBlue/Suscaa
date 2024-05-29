import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const createUser = async (req, res) => {
    try {
        const { name, email, password, confPassword, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        // Password confirmation check
        if (password !== confPassword) {
            return res.status(400).json({ msg: "Password does not match" });
        }

        const hashedPassword = await argon2.hash(password);
        await Users.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role
        });

        res.status(201).json({ msg: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ msg: error.message });
    }
};



// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['uuid','name','email','role']
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        console.log("Fetching current user...");
        const currentUser = await Users.findOne({
            attributes:['uuid','name','email'],
            where: { uuid: req.session.userId }
        });

        if (!currentUser) {
            console.log("Current user not found");
            return res.status(404).json({ message: "User not found" });
        }

        console.log("Current user found:", currentUser);
        res.json(currentUser);
    } catch (error) {
        console.error("Error fetching current user:", error);
        res.status(500).json({ error: error.message });
    }
};



// Get user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes:['uuid','name','email'],
            where: { uuid: req.params.uuid }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update user
export const updateUser = async (req, res) => {
        const user = await Users.findOne({
            where: { uuid: req.params.uuid }
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        const { name, email, confPassword, password } = req.body;
        console.log("Request body:", req.body);

        if (!name && !email && !password && !role) {
            return res.status(400).json({ msg: "No fields to update" });
        }

        const hashedPassword = password ? await argon2.hash(password) : user.password;
        
        if (password !== confPassword) {
            return res.status(400).json({ msg: "Password does not match" });
        }


    try {

        await Users.update(
            { 
                name: name || user.name, 
                email: email || user.email, 
                password: hashedPassword
            },
            { where: { uuid: req.params.uuid } }
        );

        res.json({ msg: "User updated successfully" });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ msg: error.message });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: { uuid: req.params.uuid }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await Users.destroy({
            where: { uuid: req.params.uuid }
        });
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
