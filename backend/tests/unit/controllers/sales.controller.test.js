const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;

const salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesController');
const { productsList } = require('./mock/products.mock');

describe('Test Controller', function () {
  describe('Test PRODUCTS na camada Controller', function () {
    it('Teste se getAll retorna todos os products', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getAll').resolves(productsList);
      await salesController.getAll(req, res);
      expect(res.status).to.be.calledWith(200);
    });
  });

  describe('Test SALES ', function () {
    it('Teste o retorno 200', async function () {
      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getById').resolves([[productsList[0]]]);

      await salesController.getById(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });

    it('Teste o retorno 404', async function () {
      const req = { params: { id: 999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getById')
        .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });

      await salesController.getById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
