const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;

const productsService = require('../../../src/services/productsServices');
const productsController = require('../../../src/controllers/productsController');
const { productsList, createProduct } = require('./mock/products.mock');
const validateName = require('../../../src/middleware/validateName');

describe('Test Controller', function () {
  describe('Test PRODUCTS na camada Controller', function () {
    it('Teste se getAll retorna todos os products', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'getAll').resolves(productsList);
      await productsController.getAll(req, res);
      expect(res.status).to.be.calledWith(200);
    });
  });

  describe('Test PRODUCTS retornando status 404 e 200', function () {
    it('Teste o retorno 200', async function () {
      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'getById').resolves([[productsList[0]]]);

      await productsController.getById(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });

    it('Teste o retorno 404', async function () {
      const req = { params: { id: 999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'getById')
      .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await productsController.getById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  describe('Testando o CREATE na CONTROLLER', function () {
    it('Teste se é possivel cadastrar novo produto', async function () {
      const req = { body: { name: 'ProdutoX' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const next = sinon.stub().returns();

      sinon.stub(productsService, 'create')
        .resolves({ type: null, message: createProduct });

      await validateName(req, res, next);
      await productsController.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(createProduct);
      expect(next).to.have.been.calledWith();
    });

    it('Teste o retorno 400, se o nome não for válido', async function () {
      const req = { body: { name: '' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await validateName(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });

    it('Teste o retorno 422, se o nome não for válido', async function () {
      const req = { body: { name: 'aaaa' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await validateName(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith(
        { message: '"name" length must be at least 5 characters long' },
);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
