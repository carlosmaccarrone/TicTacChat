import { render, screen, act } from '@testing-library/react';
import { jest } from '@jest/globals';
import Spinner from '@/components/Spinner/Spinner';

jest.useFakeTimers();

test('Spinner renders correctly and animates dots', () => {
  render(<Spinner />);

  const spinnerDiv = screen.getByRole('status', { hidden: true }) || screen.getByText(/Loading/i);
  expect(spinnerDiv).toBeInTheDocument();

  expect(screen.getByText('Loading')).toBeInTheDocument();

  act(() => {
    jest.advanceTimersByTime(250);
  });
  expect(screen.getByText('Loading.')).toBeInTheDocument();

  act(() => {
    jest.advanceTimersByTime(250);
  });
  expect(screen.getByText('Loading..')).toBeInTheDocument();

  act(() => {
    jest.advanceTimersByTime(250);
  });
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  act(() => {
    jest.advanceTimersByTime(250);
  });
  expect(screen.getByText('Loading')).toBeInTheDocument();
});