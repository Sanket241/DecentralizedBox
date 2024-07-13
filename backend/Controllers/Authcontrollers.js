import { errorHandler } from "../Utils/Error.js";
import Model from "../Model/Authmodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 

export const test = (req, res) => {
    console.log("test");
    res.send("test");
};

export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return next(errorHandler(400, "Please fill all the fields"));
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new Model({ username, email, password: hashedPassword });
        await user.save(); 
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(errorHandler(400, "Please fill all the fields"));
        }
        const check = await Model.findOne({ email });
        if (!check) {
            return next(errorHandler(400, "User not found"));
        }
        const compare = bcrypt.compareSync(password, check.password);
        if (!compare) {
            return next(errorHandler(400, "Invalid credentials"));
        }
        const token = jwt.sign({ id: check._id, isAdmin: check.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const { password: pass, ...rest } = check._doc;

        res.status(200)
            .cookie('access_token', token, { httpOnly: true })
            .json({ message: "User logged in successfully", rest });
    } catch (error) {
        next(error);
    }
};

export const signout=async(req,res)=>{
  try {
      res.clearCookie('access_token').status(200).json("User logged out successfully")
  } catch (error) {
    next(error);
  }
}

