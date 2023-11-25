import * as ngoController from '../../../../src/api/controllers/ngoController.js';
import * as ngoService from '../../../../src/services/ngoService.js';

jest.mock('../../../../src/services/ngoService.js');

describe('Given the ngoController module', () => {
  describe('When createNgo is called with valid ngoData', () => {
    let req, res, ngoData, response;

    beforeEach(async () => {
      req = { body: { name: 'Ngo Test' } };
      res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
      ngoData = req.body;
      response = { status: 200, message: 'NGO created successfully' };

      ngoService.createNgo.mockResolvedValue(response);

      await ngoController.createNgo(req, res);
    });

    it('Then it should call ngoService.createNgo with ngoData', () => {
      expect(ngoService.createNgo).toHaveBeenCalledWith(ngoData);
    });

    it('Then it should return a response with status 200 and message', () => {
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: response.message });
    });
  });

  describe('When deleteNgo is called with valid code', () => {
    let req, res, code, response;

    beforeEach(async () => {
      req = { body: { code: '123' } };
      res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
      code = req.body.code;
      response = { status: 200, message: 'NGO deleted successfully' };

      ngoService.deleteNgo.mockResolvedValue(response);

      await ngoController.deleteNgo(req, res);
    });

    it('Then it should call ngoService.deleteNgo with code', () => {
      expect(ngoService.deleteNgo).toHaveBeenCalledWith(code);
    });

    it('Then it should return a response with status 200 and message', () => {
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: response.message });
    });
  });
});
