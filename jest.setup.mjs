import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

global.mockFetch = (data, ok = true) => {
  global.fetch = jest.fn(() =>
    ok
      ? Promise.resolve({
          json: () => Promise.resolve(data),
        })
      : Promise.reject(new Error('Network error'))
  );
};