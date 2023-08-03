// Import the 'jsonwebtoken' library
var jwt = require("jsonwebtoken");

// Define the JWT secret key
const JWT_SECRET = "Have$omeNote$";

// Define a middleware function called 'fetchuser'
const fetchuser = (req, res, next) => {
    // Get the JWT token from the request header
    const token = req.header('auth-token');

    // Check if a token exists
    if (!token) {
        // If no token is found, send a 401 Unauthorized response with an error message
        res.status(401).send({ error: 'Please authenticate using a valid token' });
    }

    try {
        // Verify the token using the JWT secret key
        const data = jwt.verify(token, JWT_SECRET);

        // If the token is successfully verified, extract the 'user' property from the token's payload
        req.user = data.user;

        // Call the 'next' function to proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If an error occurs during token verification, send a 401 Unauthorized response with an error message
        res.status(401).send({ error: 'Please authenticate using a valid token' });
    }
}

// Export the 'fetchuser' middleware function
module.exports = fetchuser;
