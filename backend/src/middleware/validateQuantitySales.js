module.exports = (req, res, next) => {
  console.log('Validating "quantity" field...');
  const { items } = req.body;

  if (!Array.isArray(items)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  const invalidItems = items.filter((item) => {
    const { quantity } = item;
    return typeof quantity !== 'number' || quantity < 1; 
  });

  if (invalidItems.length > 0) {
    return res.status(422).json(
      { message: '"quantity" must be greater than or equal to 1' },
);
  }
  console.log('Campo "quantity" válido.');
  next();
};