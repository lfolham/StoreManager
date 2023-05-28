const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const salesService = require('../../../src/services/salesService');
const salesModel = require('../../../src/models/salesModel');
const { salesProductss } = require('../controllers/sales.controller.test');

describe('Test SALES na camada Service', function () {
  it('Test se retorna a lista de sales', async function () {
    sinon.stub(salesModel, 'getAll').resolves(salesProductss);
    const result = await salesService.getAll();
    expect(result).to.be.deep.equal(salesProductss);
  });

  describe('Test getById()', function () {
    it('ID inválido', async function () {
      sinon.stub(salesModel, 'getById').resolves(null);
      const result = await salesService.getById(999);
      expect(result).to.be.deep.equal({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
    });
  });

    it('ID válido', async function () {
      sinon.stub(salesModel, 'getById').resolves(salesProductss[1]);
      const result = await salesService.getById(1);
      expect(result.message).to.be.deep.equal(salesProductss[1]);
    });

  afterEach(function () {
    sinon.restore();
  });
});