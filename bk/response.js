const response = (res, statusCode = 200, success = false, message = '', data = {}, result = null) => {
    res.status(statusCode)
    const results = {
        success,
        message,
        data,
        result,
    }
    if (result != null) results.result = result
    res.json(results)
    res.end()
}

export default response
