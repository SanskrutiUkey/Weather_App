import JWT from "jsonwebtoken";


// user login
export const authMiddleware = async (req, res, next) => {
    try {
        // console.log('Authorization Header:', req.headers.authorization);
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        // adding decode in loginUser so that is Admin is checked
        req.userId = decode._id;
        next();
    } catch (error) {
        console.log(error);
    }
}
