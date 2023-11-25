import ngoRepository from '../../../src/repositories/ngoRepository.js';
import { Ngo } from '../../../src/models/Ngo.js';
import { ObjectId } from 'mongodb';

jest.mock('../../../src/models/Ngo.js');

describe('Given the create function', () => {
  const ngoData = { name: 'Test Ngo', code: '1234' };

  describe('When it is called with ngoData', () => {
    beforeEach(async () => {
      await ngoRepository.create(ngoData);
    });

    it('Then it should call Ngo constructor with ngoData', () => {
      expect(Ngo).toHaveBeenCalledWith(ngoData);
    });

    it('And it should save the new Ngo', () => {
      expect(Ngo.mock.instances[0].save).toHaveBeenCalled();
    });
  });
});
describe('Given the findByCode function', () => {
  const ngoCode = '1234';

  describe('When it is called with a code', () => {
    beforeEach(async () => {
      await ngoRepository.findByCode(ngoCode);
    });

    it('Then it should call Ngo.findOne with the correct code', () => {
      expect(Ngo.findOne).toHaveBeenCalledWith({ code: ngoCode });
    });
  });
});
describe('Given the findById function', () => {
  const ngoId = '507f191e810c19729de860ea';

  describe('When it is called with an id', () => {
    beforeEach(async () => {
      await ngoRepository.findById(ngoId);
    });

    it('Then it should call Ngo.findOne with the correct ObjectId', () => {
      expect(Ngo.findOne).toHaveBeenCalledWith({ _id: new ObjectId(ngoId) });
    });
  });
});
describe('Given the findByPhoneNumber function', () => {
  const phoneNumber = '1234567890';

  describe('When it is called with a phone number', () => {
    beforeEach(async () => {
      await ngoRepository.findByPhoneNumber(phoneNumber);
    });

    it('Then it should call Ngo.findOne with the correct phoneNumber', () => {
      expect(Ngo.findOne).toHaveBeenCalledWith({ phoneNumber });
    });
  });
});
describe('Given the update function', () => {
  const ngoData = { code: '1234', name: 'Updated Ngo' };

  describe('When it is called with ngoData', () => {
    beforeEach(async () => {
      await ngoRepository.update(ngoData);
    });

    it('Then it should call Ngo.findOneAndUpdate with the correct parameters', () => {
      expect(Ngo.findOneAndUpdate).toHaveBeenCalledWith(
        { code: ngoData.code },
        { $set: ngoData },
        { new: true }
      );
    });
  });
});
describe('Given the remove function', () => {
  const ngoCode = '1234';

  describe('When it is called with a code', () => {
    beforeEach(async () => {
      await ngoRepository.remove(ngoCode);
    });

    it('Then it should call Ngo.findOneAndDelete with the correct code', () => {
      expect(Ngo.findOneAndDelete).toHaveBeenCalledWith({ code: ngoCode });
    });
  });
});
