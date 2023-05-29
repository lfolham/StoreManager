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
    it('ID válido', async function () {
      sinon.stub(salesModel, 'getById').resolves(salesProductss[0]);
      const result = await salesService.getById(1);
      
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(salesProductss[0]);
    });
    
    it('ID inválido, retorna mensagem de erro', async function () {
      sinon.stub(salesModel, 'getById').resolves([]);

      const result = await salesService.getById(999);

      expect(result).to.be.deep.equal({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});