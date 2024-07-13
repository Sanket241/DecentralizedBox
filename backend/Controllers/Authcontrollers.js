import { errorHandler } from "../Utils/Error.js";
export const test = (req, res) => {
    console.log("test");
    res.send("test")
}

export const signup=(req,res,next)=>{
    console.log("signup");
    res.send("signup")
}

export const signin=(req,res,next)=>{
    console.log("signin");
    res.send("signin")
}
