exports.returnBadRequestError = (res, err) => {
    console.log("Error: -----------------------------------------");
    console.log(err);
    console.log("end of error -----------------------------------");
    res.status(400).json({
        status: 400,
        error: err.message || 'Bad Request.'
    });
}

exports.returnNotFoundError = (res, err) => {
    res.status(404).json({
        status: 404,
        error: err.message || 'Not found.'
    })
}

exports.returnInternalError = (res, err) => {
    console.log(err);
    res.status(500).json({
        status: 500,
        error: err.message || 'Internal Error'
    });
}
