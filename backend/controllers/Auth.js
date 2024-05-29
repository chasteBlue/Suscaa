import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const Register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await Users.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await argon2.hash(password);

        // Create a new user
        const newUser = await Users.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({ msg: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ msg: "Server error" });
    }
};

export const Login = async(req,res)=>{
    const user = await Users.findOne({
        where: { email: req.body.email }
    });

    if (!user) return res.status(404).json({ msg: "User not found" });

    const match = await argon2.verify(user.password,req.body.password);
    if(!match) return res.status(404).json({ msg: "Wrong Password" });
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json({uuid,name,email,role});
}
export const Me = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "No User Used!" });
    }

    try {
        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: { uuid: req.session.userId }
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ msg: error.message });
    }
};

export const Logout =(req,res)=>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg:"Error on Logout"});
        res.status(200).json({msg: "Logout Sucessfully"});
    })
}