module.exports = (req, res, next) => {
  const data = req.body;

  const invalidQuantity = data.filter((item) => item.quantity < 1);

  if (invalidQuantity.length > 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};