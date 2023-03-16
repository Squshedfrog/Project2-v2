function ensureLoggedIn(req, res, next) {
  if (req.session.userId) {
    return next()
  }

  res.locals.message = 'Login to continue'
  res.render('./users/login-form' )
}

module.exports = ensureLoggedIn
