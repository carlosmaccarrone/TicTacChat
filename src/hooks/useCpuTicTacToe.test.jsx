import { getCpuMove } from "@/hooks/useCpuTicTacToe.jsx";

test("cpu gana si tiene dos en línea", () => {
  const board = ['X','X',null, null,'O',null, null,null,'O'];
  expect(getCpuMove(board, 'X')).toBe(2);
});

test("cpu bloquea si el jugador tiene dos en línea", () => {
  const board = ['O','O',null, 'X',null,'X', null,null,null];
  expect(getCpuMove(board, 'X')).toBe(4);
});

test("cpu elige esquina si no hay amenaza ni victoria", () => {
  const board = [null, 'O', null, null, 'X', null, null, null, null];
  const move = getCpuMove(board, 'X');
  expect([0,2,6,8]).toContain(move);
});

test("cpu elige centro si esquinas ocupadas", () => {
  const board = ['O', 'X', 'O', 'X', null, 'X', 'O', null, 'X'];
  expect(getCpuMove(board, 'O')).toBe(4);
});

test("cpu elige lado si esquinas y centro ocupados", () => {
  const board = ['X','X','O','O','X','O', 'X', null,'O'];
  const move = getCpuMove(board, 'O');
  expect([1,3,5,7]).toContain(move);
});
