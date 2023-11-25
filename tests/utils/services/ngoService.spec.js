import { createNgo, checkNgoByCnpj, checkNgoById, checkNgoByPhoneNumber, updateNgo, deleteNgo } from '../../../src/services/ngoService';
import ngoRepository from '../../../src/repositories/ngoRepository';
import ngoValidationSchema from '../../../src/services/validators/ngoValidator';
import { cnpj } from 'cpf-cnpj-validator';

jest.mock('../../../src/repositories/ngoRepository');
jest.mock('../../../src/repositories/userRepository');
jest.mock('../../../src/services/validators/ngoValidator');
jest.mock('cpf-cnpj-validator', () => ({
  cnpj: {
    isValid: jest.fn(),
  },
}));
jest.mock('../../../src/config/logger');

describe('Given the checkNgoByCnpj function', () => {
  const ngoData = { cnpj: 'validCNPJ' };

  describe('When called with an existing CNPJ', () => {
    beforeEach(() => {
      ngoRepository.findByCode.mockResolvedValue({ name: 'NGO Name', cnpj: 'validCNPJ' });
    });

    it('Then should return a success message', async () => {
      const response = await checkNgoByCnpj(ngoData);
      expect(response).toEqual({ message: 'ONG encontrada.', status: 200 });
    });
  });

  describe('When called with a non-existing CNPJ', () => {
    beforeEach(() => {
      ngoRepository.findByCode.mockResolvedValue(null);
    });

    it('Then should return a not found message', async () => {
      const response = await checkNgoByCnpj({ cnpj: 'nonExistingCNPJ' });
      expect(response).toEqual({ message: 'ONG não encontrada.', status: 404 });
    });
  });

  describe('When an exception occurs', () => {
    beforeEach(() => {
      ngoRepository.findByCode.mockRejectedValue(new Error('Server error'));
    });

    it('Then should return a server error message', async () => {
      const response = await checkNgoByCnpj(ngoData);
      expect(response).toEqual({ message: 'Server error', status: 502 });
    });
  });
});
describe('Given the checkNgoById function', () => {
  const ngoData = { id: 'validId' };

  describe('When called with an existing ID', () => {
    beforeEach(() => {
      ngoRepository.findById.mockResolvedValue({ name: 'NGO Name', id: 'validId' });
    });

    it('Then should return a success message', async () => {
      const response = await checkNgoById(ngoData);
      expect(response).toEqual({ message: 'ONG encontrada.', status: 200, ngo: { name: 'NGO Name', id: 'validId' } });
    });
  });

  describe('When called with a non-existing ID', () => {
    beforeEach(() => {
      ngoRepository.findById.mockResolvedValue(null);
    });

    it('Then should return a not found message', async () => {
      const response = await checkNgoById({ id: 'nonExistingId' });
      expect(response).toEqual({ message: 'ONG não encontrada.', status: 404 });
    });
  });

  describe('When an exception occurs', () => {
    beforeEach(() => {
      ngoRepository.findById.mockRejectedValue(new Error('Server error'));
    });

    it('Then should return a server error message', async () => {
      const response = await checkNgoById(ngoData);
      expect(response).toEqual({ message: 'Server error', status: 502 });
    });
  });
});
describe('Given the checkNgoByPhoneNumber function', () => {
  const ngoData = { phoneNumber: '123456789' };

  describe('When called with an existing phone number', () => {
    beforeEach(() => {
      ngoRepository.findByPhoneNumber.mockResolvedValue({ name: 'NGO Name', phoneNumber: '123456789' });
    });

    it('Then should return a success message', async () => {
      const response = await checkNgoByPhoneNumber(ngoData);
      expect(response).toEqual({ message: 'ONG encontrada.', status: 200 });
    });
  });

  describe('When called with a non-existing phone number', () => {
    beforeEach(() => {
      ngoRepository.findByPhoneNumber.mockResolvedValue(null);
    });

    it('Then should return a not found message', async () => {
      const response = await checkNgoByPhoneNumber({ phoneNumber: 'nonExistingPhoneNumber' });
      expect(response).toEqual({ message: 'ONG não encontrada.', status: 404 });
    });
  });

  describe('When an exception occurs', () => {
    beforeEach(() => {
      ngoRepository.findByPhoneNumber.mockRejectedValue(new Error('Server error'));
    });

    it('Then should return a server error message', async () => {
      const response = await checkNgoByPhoneNumber(ngoData);
      expect(response).toEqual({ message: 'Server error', status: 502 });
    });
  });
});
describe('Given the updateNgo function', () => {
  const ngoData = { code: 'validCNPJ', name: 'Updated NGO', phoneNumber: '123456789' };
  const existingNgo = { code: 'validCNPJ', name: 'Existing NGO', phoneNumber: '123456789' };

  beforeEach(() => {
    jest.clearAllMocks();
    ngoRepository.findByCode.mockResolvedValue(existingNgo);
    ngoValidationSchema.validate.mockReturnValue({ error: null });
    cnpj.isValid.mockReturnValue(true);
    ngoRepository.update.mockResolvedValue({ ...ngoData, _id: '1' });
  });

  describe('When called with data for a non-existing NGO', () => {
    beforeEach(() => {
      ngoRepository.findByCode.mockResolvedValue(null);
    });

    it('Then should return a not found message', async () => {
      const response = await updateNgo({ ...ngoData, code: 'nonExistingCNPJ' });
      expect(response).toEqual({ message: 'ONG não encontrada.', status: 404 });
    });
  });

  describe('When an exception occurs', () => {
    beforeEach(() => {
      ngoRepository.findByCode.mockRejectedValue(new Error('Server error'));
    });

    it('Then should return a server error message', async () => {
      const response = await updateNgo(ngoData);
      expect(response).toEqual({ message: 'Server error', status: 502 });
    });
  });
});
describe('Given the deleteNgo function', () => {
  const ngoCode = 'validCNPJ';

  describe('When called with an existing NGO code', () => {
    beforeEach(() => {
      ngoRepository.findByCode.mockResolvedValue({ name: 'NGO Name', code: 'validCNPJ' });
      ngoRepository.remove.mockResolvedValue(undefined);
    });

    it('Then should delete the NGO and return a success message', async () => {
      const response = await deleteNgo(ngoCode);
      expect(response).toEqual({ message: 'ONG removida com sucesso.', status: 200 });
    });
  });
});

