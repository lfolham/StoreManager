const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const validateQuantGreather1 = require('../../../src/middleware/validateQuantGreather1');

describe('Teste middleware validateQuantity', function () {
  it('Se nao tiver quantity, retorna erro', async function () {
    const res = {};
    const req = {
      body: [
        {
          productId: 2,
        },
        {
          productId: 2,
        },
      ],
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await validateQuantGreather1(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been
    .calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });

  it('middleware passou', async function () {
    const res = {};
    const req = {
      body: [
        {
          productId: 2,
          quantity: 2,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };

    const next = sinon.stub().returns();
    await validateQuantGreather1(req, res, next);
    expect(next).to.have.been.calledWith();
  });

  afterEach(function () {
    sinon.restore();
  });
});