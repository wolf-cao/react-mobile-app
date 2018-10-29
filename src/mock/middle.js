module.exports = (req, res, next) => {
  req.method = 'get'
  next()
}
