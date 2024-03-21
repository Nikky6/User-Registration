const jwt = require('jsonwebtoken')



export async function verifyToken(payload) {
    try {
        const token = payload.header('x-token')
        if (!token) {
            throw 'token not found'
        }
        let decoded = jwt.verify(token, 'jwtPassword')
        payload.user = decoded.user
        next();
    } catch (err) {
        console.log("error in authentication", err)
        return ({
            statusCode: 404,
            message: "error in authentication",
            err
        })
    }
}
