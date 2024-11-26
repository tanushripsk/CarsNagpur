const { sendVerificationEmail, sendWelcomeEmail } = require("../middleware/Email.js");
const { generateTokenAndSetCookies } = require("../middleware/GenerateToken.js");
const bcryptjs = require('bcryptjs');
const UserModel = require("../model/User.js");

const Register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User Already Exists. Please Login" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new UserModel({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        });

        await user.save();
        generateTokenAndSetCookies(res, user._id);
        await sendVerificationEmail(user.email, verificationToken);

        return res.status(200).json({ success: true, message: "User Registered Successfully", user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const VerifyEmail = async (req, res) => {
    try {
        const { code } = req.body;
        const user = await UserModel.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or Expired Code" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        await sendWelcomeEmail(user.email, user.name);

        return res.status(200).json({ success: true, message: "Email Verified Successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = { Register, VerifyEmail };
