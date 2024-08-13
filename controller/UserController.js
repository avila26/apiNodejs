import {UserModel} from '../model/UserModel.js'
import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../config/config.js";
import bcrypt from "bcrypt";


export const getUserModel=()=>{
    
};

export const register = async (req, res) => {
    const { name, email, password, typeusers_id } = req.body;
    try {
      if (!name || !email || !password || !typeusers_id ) {
        return res.status(401).json({ message: "not input invalid" });
      }
      const verfiEmail = await UserModel.findOne({ where: { email: email }});
      if (verfiEmail) {
        return res.status(401).json({ message: "email is already exist." });
      }
      const encryptedPassword = await bcrypt.hash(password.toString(),10);
      const user = await UserModel.create({
        name,
        email,
        password:encryptedPassword,
        typeusers_id
      });
      // Create token
      const token = jwt.sign({ user_id: user.id, email }, TOKEN_KEY, {
        expiresIn: "1h",
      });
      return res
        .status(201)
        .json({ user: user, message: "create succesfull", token: token });
    } catch (error) {res.status(500).json({ message: error.message });}
  };
  
  export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if(!email || !password ){
            return res.status(401).json({message: "not input invalid"});
        }
        const verfiEmail = await UserModel.findOne({ where: { email: email }});
        if (!verfiEmail) {
            return res.status(401).json({ message: "not  found this account" });
        }
          // Validate password
        const isPasswordValid = await bcrypt.compare(password, verfiEmail.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Create token
        const token = jwt.sign({ user_id: verfiEmail.id, email }, TOKEN_KEY, {
            expiresIn: "1h",
        });
        return res
        .status(200)
        .json({ user: verfiEmail, message: "login succesfull", token: token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
