// not found middleware
function notFound(req, res) {
    res.status(404).send("Route does not exsist");
}

module.exports = notFound;