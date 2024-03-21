import JWT from "jsonwebtoken";

// user login
// export let userrId = null;
export const authMiddleware = async (req, res, next) => {
    try {
        // console.log('Authorization Header:', req.headers.authorization);
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        // adding decode in loginUser so that is Admin is checked
        req.userId = decode._id;
        // userrId = req.userId;
        // console.log("authMiddleware ", userrId);
        next();
    } catch (error) {
        console.log(error);
    }
}
