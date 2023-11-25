import * as authController from '../../../../src/api/controllers/authController.js';
import * as authService from '../../../../src/services/authService.js';

jest.mock('../../../../src/services/authService.js');

describe('Given the authController module', () => {
    describe('When authenticateUser is called with valid ngoData', () => {
      let req, res, ngoData, response;
  
      beforeEach(async () => {
        req = { body: { email: 'test@example.com' }, session: {} };
        res = {
          status: jest.fn(() => res),
          json: jest.fn(),
        };
        ngoData = req.body;
        response = { status: 200, message: 'Login successful', token: 'token123' };
  
        authService.login.mockResolvedValue(response);
  
        await authController.authenticateUser(req, res);
      });
  
      it('Then it should call authService.login with ngoData', () => {
        expect(authService.login).toHaveBeenCalledWith(ngoData);
      });
  
      it('Then it should set req.session.token and req.session.email', () => {
        expect(req.session.token).toBe('token123');
        expect(req.session.email).toBe(ngoData.email);
      });
  
      it('Then it should return a response with status 200, message, and token', () => {
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: response.message, token: response.token });
      });
    });
  
    describe('When logout is called', () => {
        let req, res;
    
        beforeEach(() => {
          req = { session: { destroy: jest.fn() } };
          res = {
            status: jest.fn(() => res),
            send: jest.fn(),
          };
    
          authController.logout(req, res);
        });
    
        it('Then it should destroy the session', () => {
          expect(req.session.destroy).toHaveBeenCalled();
        });
    
        it('Then it should return a response with status 200', () => {
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.send).toHaveBeenCalledWith('Usuário foi deslogado.');
        });
      });
  });