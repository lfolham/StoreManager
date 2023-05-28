const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const salesService = require('../../../src/services/salesService');
const salesModel = require('../../../src/models/salesModel');
const { salesProductss } = require('./mock/sales.mock');

describe('Test SALES na camada Service', function () {
  describe('teste', function () {
    it('Test se retorna a lista de sales', async function () {
      sinon.stub(salesModel, 'getAll').resolves(salesProductss);
      const result = await salesService.getAll();
      expect(result).to.be.deep.equal(salesProductss);
    });
  });

  describe('Test getById()', function () {
    it('ID inválido', async function () {
      sinon.stub(salesModel, 'getById').resolves(null);
      const result = await salesService.getById(999);

      expect(result).to.be.deep.equal({ type: 404, message: 'Sale not found' });
    });

    it('ID válido', async function () {
      sinon.stub(salesModel, 'getById').resolves(salesProductss[2]);
      const result = await salesService.getById(2);
      
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(salesProductss[2]);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});