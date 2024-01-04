import { parseUser1Data } from '../src/users';

describe('users', () => {
  describe('parseUser1Data', () => {
    test('should parse a user with a full name', () => {
      const user = parseUser1Data({
        id: 1,
        full_name: 'John Doe',
        email_address: 'foo@gmail.com',
        phone: '1234567890',
      });
      
      expect(user).toEqual({
        id: 1,
        fullName: 'John Doe',
        email: 'foo@gmail.com',
        phone: '1234567890',
      });
    });
    test('should parse a user with a first and last name', () => {
      const user = parseUser1Data({
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'foo@gmail.com',
        phone_number: '1234567890',
      });
      
      expect(user).toEqual({
        id: 1,
        fullName: 'John Doe',
        email: 'foo@gmail.com',
        phone: '1234567890',
      });
    });
    test('should parse a user with a username', () => {
      const user = parseUser1Data({
        id: 1,
        username: 'johndoe',
        email: 'foo@gmail.com',
        phone: '1234567890',
      });
      
      expect(user).toEqual({
        id: 1,
        userName: 'johndoe',
        email: 'foo@gmail.com',
        phone: '1234567890',
      });
    });
  });
});
