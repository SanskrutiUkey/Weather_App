import { hashPassword, comparePassword } from "../helper/authHelper.js";
import JWT from 'jsonwebtoken';
import userModel from "../models/userModel.js";
export let userrId = null;
export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Validations
        if (!name) {
            return res.send({ message: "Name is required" });
        }
        if (!password) {
            return res.send({ message: "Password is required" });
        }
        if (!email) {
            return res.send({ message: "Email is required" });
        }
        //existing user(bcoz same email se do log nhi register ho sakte hai)
        const existinguser = await userModel.findOne({ email })

        if (existinguser) {
            return res.status(400).send({
                success: false,
                message: "Already Registered, Please Login"
            })
        }

        //register user
        const hashPass = await hashPassword(password)

        //save
        const user = await new userModel({ name, email, password: hashPass }).save()

        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message: 'Error in Registration',
                error
            }
        )
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(404).send({
                success: false,
                message: "Invalid email or password"
            })
        }
        // check user
        const loginUser = await userModel.findOne({ email: email });
        if (!loginUser) {
            return res.status(404).send(
                {
                    success: false,
                    message: "Email is not registered"

                })
        }
        const match = await comparePassword(password, loginUser.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Incorrect Password"
            });
        }

        // token

        const token = await JWT.sign({ _id: loginUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        userrId = loginUser._id
        console.log("AuthController ", userrId);
        res.status(200).send({
            success: true,
            message: "Login Successfully",
            user: {
                name: loginUser.name,
                email: loginUser.email,
                _id: loginUser._id
            },
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        }
        )
    }
}

