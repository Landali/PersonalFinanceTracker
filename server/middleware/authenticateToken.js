const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.log('jwt error: ', {
                    name: err.name,
                    message: err.message,

                })
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({
                        error: err.name,
                        message: err.message
                    });;
                }
                return res.status(401).json({
                    message: 'Error Verifying access token'
                });;
                //  throw new Error("User is not authorized");
            }
            req.user = decoded.user;
            return next();

        });

        if (!token) {
            return res.status(401).json({
                message: 'User is not authorized or token is missing'
            });
            //  throw new Error("User is not authorized or token is missing");
        }
    } else {
        return res.status(401).json({
            message: 'User is not authorized or token is missing'
        });
    }
});

module.exports = validateToken;