import User from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "No User Used!" });
    }
    try {
        const user = await User.findOne({
            where: { uuid: req.session.userId }
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        req.userId = user.id; // Corrected to use user.uuid
        req.role = user.role; // Retrieve and store user's role
        next();
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ msg: error.message });
    }
};

export const adminOnly = (req, res, next) => {
    if (req.role !== "admin") {
        return res.status(403).json({ msg: "Access is Forbidden" });
    }
    next();
};
