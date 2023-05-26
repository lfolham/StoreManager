const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;

const productsService = require('../../../src/services/productsServices');
const productsController = require('../../../src/controllers/productsController');
const { productsList } = require('./mock/products.mock');

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