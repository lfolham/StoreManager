const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const validateProductId = require('../../../src/middleware/validateProductId');

describe('Teste Middleware ProductId', function () {
  it('Não valida sem o campo productId', async function () {
    const res = {};
    const req = {
      body: [
        {
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await validateProductId(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
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

    await validateProductId(req, res, next);

    expect(next).to.have.been.calledWith();
  });

  afterEach(sinon.restore);
});