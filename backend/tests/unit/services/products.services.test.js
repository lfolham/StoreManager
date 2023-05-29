const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const productsService = require('../../../src/services/productsServices');
const productsModel = require('../../../src/models/productsModel');
const { productsList } = require('./mock/products.service.mock');

describe('Test PRODUCTS na camada Service', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Teste se getAll retorna todos os produtos', async function () {
    sinon.stub(productsModel, 'getAll').resolves(productsList);

    const result = await productsService.getAll();

    expect(result).to.be.deep.equal(productsList);
  });

  describe('Test getById()', function () {
    it('ID inválido', async function () {
      sinon.stub(productsModel, 'getById').resolves(null);

      const result = await productsService.getById(999);

      expect(result).to.be.deep.equal({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
    });

    it('ID válido', async function () {
      sinon.stub(productsModel, 'getById').resolves(productsList[0]);

      const result = await productsService.getById(1);
      
      expect(result.message).to.be.deep.equal(productsList[0]);
    });
  });
});