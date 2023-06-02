module.exports = (req, res, next) => {
  const { items } = req.body;

  if (items.some((item) => !item.productId)) {
    return res.status(400).json({ message: '"productId" is required' });
  }

    if (items < 1) {
    return res.status(422)
    .json({ message: '"quantity" must be greater than or equal to 1' }); 
  }

  next();
};