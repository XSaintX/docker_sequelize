function errorLogs(err, req, res, next) {
    console.log('errorLogs');
    console.error(err);
    next(err);
}

function handlerError(err, req, res, next) {
    console.log('Handling error...');
    res.status(501).json({ message: 'Internal Server Error' });
}

module.exports = {
    errorLogs,
    handlerError
}