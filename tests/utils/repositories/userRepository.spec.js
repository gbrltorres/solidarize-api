import userRepository from '../../../src/repositories/userRepository.js';
import { User } from '../../../src/models/User.js';

jest.mock('../../../src/models/User.js');

describe('Given the create function', () => {
  const userData = { name: 'Test User', email: 'test@example.com' };

  describe('When it is called with userData', () => {
    beforeEach(async () => {
      await userRepository.create(userData);
    });

    it('Then it should call User constructor with userData', () => {
      expect(User).toHaveBeenCalledWith(userData);
    });

    it('And it should save the new User', () => {
      expect(User.mock.instances[0].save).toHaveBeenCalled();
    });
  });
});
describe('Given the findByEmail function', () => {
  const userEmail = 'test@example.com';

  describe('When it is called with an email', () => {
    beforeEach(async () => {
      await userRepository.findByEmail(userEmail);
    });

    it('Then it should call User.findOne with the correct email', () => {
      expect(User.findOne).toHaveBeenCalledWith({ email: userEmail });
    });
  });
});
describe('Given the updateUserNgo function', () => {
    const userEmail = 'test@example.com';
    const ngo = { name: 'Test Ngo', code: '1234' };
  
    describe('When it is called with an email and ngo data', () => {
      beforeEach(async () => {
        await userRepository.updateUserNgo(userEmail, ngo);
      });
  
      it('Then it should call User.findOneAndUpdate with the correct parameters', () => {
        expect(User.findOneAndUpdate).toHaveBeenCalledWith(
          { email: userEmail },
          { ngo },
          { new: true }
        );
      });
    });
  });