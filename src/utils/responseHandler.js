module.exports = (res, statusCode, message, data = null) => {
    return res.status(statusCode).send({
        message : message,
        data: data
    });
}