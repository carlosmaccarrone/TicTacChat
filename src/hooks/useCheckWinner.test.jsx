import { useCheckWinner } from '@/hooks/useCheckWinner.jsx';

test('detecta ganador por fila', () => {
  const { checkWinner } = useCheckWinner();
  const board = [
    'X', 'X', 'X',
    null, 'O', null,
    'O', null, null
  ];
  const result = checkWinner(board);
  expect(result).toEqual({ winner: 'X', line: [0,1,2] });
});

test('detecta ganador por columna', () => {
  const { checkWinner } = useCheckWinner();
  const board = [
    'O', 'X', null,
    'O', 'X', null,
    'O', null, 'X'
  ];
  const result = checkWinner(board);
  expect(result).toEqual({ winner: 'O', line: [0,3,6] });
});

test('detecta ganador por diagonal', () => {
  const { checkWinner } = useCheckWinner();
  const board = [
    'X', null, 'O',
    null, 'X', 'O',
    null, null, 'X'
  ];
  const result = checkWinner(board);
  expect(result).toEqual({ winner: 'X', line: [0,4,8] });
});

test('detecta empate', () => {
  const { checkWinner } = useCheckWinner();
  const board = [
    'X','O','X',
    'O','O','X',
    'X','X','O'
  ];
  const result = checkWinner(board);
  expect(result).toEqual({ winner: 'draw', line: null });
});

test('detecta tablero sin ganador', () => {
  const { checkWinner } = useCheckWinner();
  const board = [
    'X', null, 'O',
    null, 'O', null,
    null, null, 'X'
  ];
  const result = checkWinner(board);
  expect(result).toEqual({ winner: null, line: null });
});
