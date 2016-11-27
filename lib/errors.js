export default (err, req, res, next) => {
    if (err.name === "JsonSchemaValidation") {
        res.status(400).json({errors: [{message: "Invalid Json"}]});
    } else if (err.name === "UnauthorizedError") {
        res.status(401).json({errors: [{message: "Invalid Token"}]});
    } else if (err && err.message) {
        res.status(400).json({errors: [{message: err.message}]});
    } else {
        res.status(500).json({errors: [{message: "Internal Server Error"}]});
    }
};