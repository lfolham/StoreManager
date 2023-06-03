module.exports = (req, res, next) => {
  const data = req.body;

  if (data.some((item) => item.quantity === undefined)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  next();
};