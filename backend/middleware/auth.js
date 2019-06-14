const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // const authHeader = req.get('Authorization');
    // if (!authHeader) {
    //     req.isAuth = false;
    //     return next();
    // }
    // const token = authHeader.split(' ')[1]; //bearer <token>
    // if (!token || token == ' ') {
    //     req.isAuth = false;
    //     return next();
    // }
    // let decodedToken;
    // try {
    //     decodedToken = jwt.verify(token, 'secretKey');
    // } catch (error) {
    //     req.isAuth = false;
    //     return next();
    // }
    // if (!decodedToken) {
    //     req.isAuth = false;
    //     return next();
    // }
    // req.userId = decodedToken.userId;
    req.userId = "5cfcf45a86ed401cdc17bb54";
    req.isAuth = true;
    return next();
}