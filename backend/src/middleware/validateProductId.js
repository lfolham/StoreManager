module.exports = (req, res, next) => {
  console.log('productId" is required - require', req.body.items); 
  // Será validado que não é possível cadastrar uma venda sem o campo productId
  const data = req.body;

  if (data.some((item) => !item.productId)) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  if (data < 1) {
 return res.status(422)
    .json({ message: '"quantity" must be greater than or equal to 1' }); 
}
  console.log('productId is required - passed');
  next();
};