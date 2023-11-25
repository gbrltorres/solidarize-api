import authService from '../../../src/services/authService';
import userRepository from '../../../src/repositories/userRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import logger from '../../../src/config/logger';

jest.mock('../../../src/repositories/userRepository');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../../src/config/logger');

describe('Given the login function', () => {
  const requestData = { email: 'test@example.com', password: 'password123' };
  const fakeUser = { _id: '1', email: 'test@example.com', password: 'hashedpassword' };
  const secret = 'secret';
  const fakeToken = 'fakeToken';

  beforeEach(() => {
    process.env.SECRET = secret;
    userRepository.findByEmail.mockResolvedValue(fakeUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue(fakeToken);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('When it is called with missing email or password', () => {
    it('Then it should return a 400 status and a relevant message', async () => {
      const response = await authService.login({ email: '', password: 'password123' });
      expect(response).toEqual({ message: 'Há campos que não foram preenchidos.', status: 400 });
    });
  });

  describe('When no user is found with the provided email', () => {
    beforeEach(() => {
      userRepository.findByEmail.mockResolvedValue(null);
    });

    it('Then it should return a 404 status and a relevant message', async () => {
      const response = await authService.login(requestData);
      expect(response).toEqual({ message: 'Nenhum cadastro foi encontrado com o e-mail fornecido.', status: 404 });
    });
  });

  describe('When the password is invalid', () => {
    beforeEach(() => {
      bcrypt.compare.mockResolvedValue(false);
    });

    it('Then it should return a 401 status and a relevant message', async () => {
      const response = await authService.login(requestData);
      expect(response).toEqual({ message: 'Credenciais de usuário incorretas.', status: 401 });
    });
  });

  describe('When login is successful', () => {
    it('Then it should return a 200 status, a success message, and a token', async () => {
      const response = await authService.login(requestData);
      expect(response).toEqual({ message: 'Login realizado com sucesso.', status: 200, token: fakeToken });
    });
  });

  describe('When an unexpected error occurs', () => {
    const unexpectedError = new Error('Unexpected error');
  
    beforeEach(() => {
      userRepository.findByEmail.mockRejectedValue(unexpectedError);
    });
  
    it('Then it should return a 500 status and the error message', async () => {
      const response = await authService.login(requestData);
      expect(response.status).toEqual(500);
      expect(response.message).toBe(unexpectedError.message);
    });
  });
});
