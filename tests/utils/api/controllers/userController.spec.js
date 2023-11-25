import * as userController from '../../../../src/api/controllers/userController.js';
import * as userService from '../../../../src/services/userService.js';

jest.mock('../../../../src/services/userService.js');

describe('Given the userController module', () => {
  describe('When createUser is called with valid userData', () => {
    let req, res, userData, response;

    beforeEach(async () => {
      req = { body: { name: 'User Test' } };
      res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
      userData = req.body;
      response = { status: 200, message: 'User created successfully' };

      userService.createUser.mockResolvedValue(response);

      await userController.createUser(req, res);
    });

    it('Then it should call userService.createUser with userData', () => {
      expect(userService.createUser).toHaveBeenCalledWith(userData);
    });

    it('Then it should return a response with status 200 and message', () => {
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: response.message });
    });
  });

  describe('When checkUser is called with valid userData', () => {
    let req, res, userData, response;

    beforeEach(async () => {
      req = { query: { username: 'user123' } };
      res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
      userData = req.query;
      response = { status: 200, message: 'User found' };

      userService.checkUser.mockResolvedValue(response);

      await userController.checkUser(req, res);
    });

    it('Then it should call userService.checkUser with userData', () => {
      expect(userService.checkUser).toHaveBeenCalledWith(userData);
    });

    it('Then it should return a response with status 200 and response data', () => {
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(response);
    });
  });
});
