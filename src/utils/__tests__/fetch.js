import axios from 'axios';
import * as fetch from '../fetch';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('src/utils/fetch', () => {
  test('fetch', () => {
    const items = fetch;

    const resError = key => {
      axios.get.mockRejectedValueOnce({ response: { data: 'error' } });
      items[key]().catch(err => {
        expect(err).toBe('error');
      });
    };

    Object.keys(fetch).map(async i => {
      if (i === 'getProfile') {
        resError(i);
      }
      else {
        const res = await items[i]();
        expect(res).toBe('tes');
      }
    });
  });
});
