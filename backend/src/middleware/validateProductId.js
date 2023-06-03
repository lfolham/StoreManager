module.exports = (req, res, next) => {
  const data = req.body;

  if (data.some((item) => !item.productId)) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  next();
};