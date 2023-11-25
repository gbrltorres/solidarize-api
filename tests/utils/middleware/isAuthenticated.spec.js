import isAuthenticated from '../../../src/middleware/isAuthenticated.js';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('Given the isAuthenticated middleware', () => {
  let req, res, next, authHeader, token, verifyTokenCallbackResult;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      sendStatus: jest.fn(),
    };
    next = jest.fn();
    authHeader = null;
    token = null;
    verifyTokenCallbackResult = null;
  });

  describe('When token is missing', () => {
    beforeEach(() => {
      isAuthenticated(req, res, next);
    });

    it('Then it should send a 401 status', () => {
      expect(res.sendStatus).toHaveBeenCalledWith(401);
    });

    it('Then it should not call next', () => {
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('When token is provided but verifyToken returns an error', () => {
    beforeEach(() => {
      authHeader = 'Bearer invalidToken';
      token = 'invalidToken';
      req.headers['authorization'] = authHeader;
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(new Error('Invalid token'), null);
      });
      isAuthenticated(req, res, next);
    });

    it('Then it should send a 403 status', () => {
      expect(res.sendStatus).toHaveBeenCalledWith(403);
    });

    it('Then it should not call next', () => {
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('When token is provided and verifyToken is successful', () => {
    beforeEach(() => {
      authHeader = 'Bearer validToken';
      token = 'validToken';
      req.headers['authorization'] = authHeader;
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, { userId: 1 });
      });
      isAuthenticated(req, res, next);
    });

    it('Then it should call next', () => {
      expect(next).toHaveBeenCalled();
    });

    it('Then it should set req.user with the user object', () => {
      expect(req.user).toEqual({ userId: 1 });
    });
  });
});
