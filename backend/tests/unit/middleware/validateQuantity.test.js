const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const { createSales } = require('../../../src/controllers/salesController');

const validateQuantity = require('../../../src/middleware/validateQuantity');

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

      const next = sinon.stub().returns();
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

    const result = await createSales(req, res);
    await validateQuantity(req, res, next);

    expect(next).to.have.been.calledWith();
    expect(result.status).to.have.been.calledWith(400);
    expect(result.json).to.have.been.calledWith({ message: '"quantity" is required' });
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
    await validateQuantity(req, res, next);
    expect(next).to.have.been.calledWith();
  });

  afterEach(function () {
    sinon.restore();
  });
  });