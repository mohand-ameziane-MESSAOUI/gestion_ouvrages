module.exports = (res, status = 500, success = false, message = "error", data = null) => {
    return res.status(status).json({
        success,
        message,
        data: data === null ? [] : data
    });
}