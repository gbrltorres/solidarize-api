import bcrypt from 'bcrypt';
import { createUser, checkUser } from '../../../src/services/userService';
import userRepository from '../../../src/repositories/userRepository';
import userValidationSchema from '../../../src/services/validators/userValidator';

jest.mock('bcrypt');
jest.mock('../../../src/repositories/userRepository');
jest.mock('../../../src/services/validators/userValidator');
jest.mock('../../../src/config/logger');

describe('Given the createUser function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('When called with valid user data', () => {
    const userData = { email: 'test@example.com', password: 'password123' };

    beforeEach(() => {
      bcrypt.genSalt.mockResolvedValue('salt');
      bcrypt.hash.mockResolvedValue('encryptedPassword');
      userRepository.create.mockResolvedValue(undefined);
      userValidationSchema.validate.mockReturnValue({ error: null });
    });

    it('Then should create a new user and return a success message', async () => {
      const response = await createUser(userData);
      expect(response).toEqual({ message: 'Usuário criado com sucesso.', status: 200 });
    });
  });

  describe('When called with invalid user data', () => {
    beforeEach(() => {
      userValidationSchema.validate.mockReturnValue({ error: { details: [{ message: 'Invalid data' }] } });
    });

    it('Then should return a validation error message', async () => {
      const response = await createUser({ email: 'invalidEmail' });
      expect(response).toEqual({ message: 'Invalid data', status: 400 });
    });
  });

  describe('When an email is already in use', () => {
    beforeEach(() => {
      userValidationSchema.validate.mockReturnValue({ error: null });
      userRepository.findByEmail.mockResolvedValue({ email: 'test@example.com' });
    });

    it('Then should return an email in use error message', async () => {
      const response = await createUser({ email: 'test@example.com', password: 'password123' });
      expect(response).toEqual({ message: 'O e-mail fornecido já está em uso.', status: 400 });
    });
  });
});
describe('Given the checkUser function', () => {
    const userData = { email: 'test@example.com' };
  
    describe('When called with an email of an existing user', () => {
      beforeEach(() => {
        userRepository.findByEmail.mockResolvedValue({ email: 'test@example.com', name: 'Test User' });
      });
  
      it('Then should return a success message and user data', async () => {
        const response = await checkUser(userData);
        expect(response).toEqual({ message: 'Usuário encontrado.', status: 200, user: { email: 'test@example.com', name: 'Test User' } });
      });
    });
  
    describe('When called with an email of a non-existing user', () => {
      beforeEach(() => {
        userRepository.findByEmail.mockResolvedValue(null);
      });
  
      it('Then should return a not found message', async () => {
        const response = await checkUser({ email: 'nonExistingEmail@example.com' });
        expect(response).toEqual({ message: 'Usuário não encontrado.', status: 404 });
      });
    });
  
    describe('When an exception occurs', () => {
      beforeEach(() => {
        userRepository.findByEmail.mockRejectedValue(new Error('Server error'));
      });
  
      it('Then should return a server error message', async () => {
        const response = await checkUser(userData);
        expect(response).toEqual({ message: 'Server error', status: 502 });
      });
    });
  });
  
