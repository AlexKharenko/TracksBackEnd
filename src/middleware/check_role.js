const CheckIfContentMaker = (req, res, next) => {
  if (
    req.body?.user?.role === 'content_maker' ||
    req.body?.user?.role === 'admin'
  ) {
    return next();
  }
  return res.status(403).json({
    success: false,
    main_message: 'Forbiden',
  });
};

const CheckIfAdmin = (req, res, next) => {
  if (req.body?.user?.role === 'admin') {
    return next();
  }
  return res.status(403).json({
    success: false,
    main_message: 'Forbiden',
  });
};

module.exports = { CheckIfContentMaker, CheckIfAdmin };
