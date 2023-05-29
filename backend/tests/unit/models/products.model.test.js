const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/productsModel');
const { productsList, creatProduct } = require('./mocks/products.mock');

describe('Test PRODUCTS na camada Model', function () {
  it('Teste se getAll retorna todos os products', async function () {
    sinon.stub(connection, 'execute').resolves([productsList]);

    const result = await productsModel.getAll();

    expect(result).to.be.deep.equal(productsList);
  });

  it('Teste se getById retorna apenas um product', async function () {
    sinon.stub(connection, 'execute').resolves([[productsList[0]]]);

    const result = await productsModel.getById(1);

    expect(result).to.be.deep.equal(productsList[0]);
  });

  it('Teste a CREATE na MODEL', async function () {
    sinon.stub(connection, 'execute').resolves([[creatProduct]]);

    const result = await productsModel.create('ProdutoX');

    expect(result).to.be.deep.equal(creatProduct);
  });

  afterEach(function () {
    sinon.restore();
  });
});