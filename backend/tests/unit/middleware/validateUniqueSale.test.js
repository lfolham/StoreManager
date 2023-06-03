const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const validateUniqueSale = require('../../../src/middleware/validateUniqueSale');

describe('Teste middleware validateUniqueSale', function () {
  it('Não valida sem o campo  Quantity', async function () {
      const res = {};
    const req = [
      {
        productId: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await validateUniqueSale(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
    });

    it('quantity menor que 1 retorna erro', async function () {
        const res = {};
      const req = [
        {
          productId: 1,
          quantity: 0,
        },
        {
          productId: 2,
          quantity: 0,
        },
      ];

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

      await validateUniqueSale(req, res);

        expect(res.status).to.have.been.calledWith(422);
        expect(res.json).to.have.been
        .calledWith({ message: '"quantity" must be greater than or equal to 1' });
      });

  it('middleware passou', async function () {
        const res = {};
        const req = {
            body: {
                  quantity: 5,
                },
          };

        const next = sinon.stub().returns();
        await validateUniqueSale(req, res, next);
        expect(next).to.have.been.calledWith();
      });

  afterEach(function () {
    sinon.restore();
  });
  });