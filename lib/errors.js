module.exports = function (err, req, res, next) {
    if (err.name === "JsonSchemaValidation") {
        res.status(400).send("Invalid Json")
    } else if (err.name === "UnauthorizedError") {
        res.status(401).send("Invalid Token");
    } else if (err && err.message) {
        res.status(400).send(err.message);
    } else {
        res.status(500).send("Internal Server Error.");
    }
};