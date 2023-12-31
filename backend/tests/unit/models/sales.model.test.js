const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/salesModel');
const { salesProductss } = require('./mocks/sales.mock');

describe('Test SALES na camada Model', function () {
  it('TEste se a getAll retorna os sales', async function () {
    sinon.stub(connection, 'execute').resolves([salesProductss]);

    const result = await salesModel.getAll();

    expect(result).to.be.deep.equal(salesProductss);
  });

  it('Teste se getById retorna apenas um sale', async function () {
    sinon.stub(connection, 'execute').resolves([salesProductss[0]]);

    const result = await salesModel.getById(2);

    expect(result).to.be.deep.equal(salesProductss[0]);
  });

  it('Teste se o createSaleId retorna corretamente', async function () {
    sinon.stub(connection, 'execute').resolves([{
      fieldCount: 0,
      affectedRows: 1,
      insertId: 1,
      info: '',
      serverStatus: 2,
      warningStatus: 0,
    }]);

    const result = await salesModel.createSaleId();

    expect(result).to.be.deep.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  });
});
