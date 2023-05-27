// const sinon = require('sinon');
// const { expect } = require('chai');

// const productService = require('../../../src/services/productsServices');
// const productController = require('../../../src/controllers/productsController');
// const { allProducts } = require('./mock/products.mock');

// describe('Teste do Controlador de Produtos', function () {
//   afterEach(function () {
//     sinon.restore();
//   });

//   describe('Listando um produto', function () {
//     it('Deve retornar o status 200 e o produto referente ao id', async function () {
//       const res = {};
//       const req = { params: { id: 1 } };

//       res.status = sinon.stub().returns(res);
//       res.json = sinon.stub().returns();
//       sinon.stub(productService, 'findById').resolves({ type: null, message: allProducts[0] });

//       await productController.getAll(req, res);

//       expect(res.status).to.have.been.calledWith(200);
//       expect(res.json).to.have.been.calledWith(allProducts[0]);
//     });

    it('Deve retornar o status 404 e mensagem de erro caso não exista', async function () {
      const res = {};
      const req = { params: { id: 999 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'getById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await productController.getById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  describe('Listando todos os produtos', function () {
    it('Deve retornar o status 200 e a lista de produtos', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'getById').resolves({ type: null, message: allProducts });

      await productController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts);
    });

    it('Deve retornar o status 404 ', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'getById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'No products found' });

      await productController.getById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'No products found' });
    });
  });
});