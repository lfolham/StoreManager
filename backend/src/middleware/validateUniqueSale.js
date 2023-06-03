// module.exports = (req, res, next) => {
//   const { items } = req.body;

//   if (items.some((item) => !item.productId)) {
//     return res.status(400).json({ message: '"productId" not found' });
//   }

//   next();
// };