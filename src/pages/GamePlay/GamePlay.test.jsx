import { render, screen } from '@testing-library/react';
import { jest } from '@jest/globals';

jest.unstable_mockModule('@/pages/GamePlay/Board', () => ({
  __esModule: true,
  default: (props) => <div data-testid="board" {...props}>Board</div>
}));

jest.unstable_mockModule('@/pages/GamePlay/ResultMessage/ResultMessageCPU', () => ({
  __esModule: true,
  default: (props) => <div data-testid="result-cpu" {...props}>CPU Result</div>
}));

jest.unstable_mockModule('@/pages/GamePlay/ResultMessage/ResultMessagePVP', () => ({
  __esModule: true,
  default: (props) => <div data-testid="result-pvp" {...props}>PVP Result</div>
}));

jest.unstable_mockModule('@/components/MessageScreen/MessageScreen', () => ({
  __esModule: true,
  default: () => <div data-testid="message-screen">Messages</div>
}));

jest.unstable_mockModule('@/components/MessageInput/MessageInput', () => ({
  __esModule: true,
  default: () => <input data-testid="message-input" />
}));

jest.unstable_mockModule('@/contexts/RoomContextCpu', () => ({
  __esModule: true,
  useRoomCPU: jest.fn(() => ({
    board: Array(9).fill(null),
    turn: 'X',
    winner: null,
    playerMarks: { X: 'player', O: 'cpu' },
    handleMove: jest.fn(),
    handleRestart: jest.fn(),
    checkWinner: jest.fn()
  }))
}));

jest.unstable_mockModule('@/contexts/RoomContextPvp', () => ({
  __esModule: true,
  useRoomPVP: jest.fn(() => ({
    board: Array(9).fill(null),
    turn: 'O',
    winner: null,
    playerMarks: { X: 'player', O: 'player' },
    mySymbol: 'X',
    handleMove: jest.fn(),
    handleRestart: jest.fn(),
    checkWinner: jest.fn(),
    privateMessages: [],
    sendPrivateMessage: jest.fn()
  }))
}));

jest.unstable_mockModule('react-router-dom', async () => {
  const actual = await jest.requireActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: jest.fn(() => [{ get: () => 'cpu' }]),
    useOutletContext: jest.fn(() => ({ navbarHeight: 50 }))
  };
});

const { default: GamePlayPage } = await import('@/pages/GamePlay/GamePlay');

describe('GamePlayPage', () => {
  test('renderiza Board y ResultMessageCPU en modo CPU', () => {
    render(<GamePlayPage />);

    expect(screen.getByTestId('board')).toBeInTheDocument();
    expect(screen.getByTestId('result-cpu')).toBeInTheDocument();
    expect(screen.queryByTestId('result-pvp')).not.toBeInTheDocument();
    expect(screen.queryByTestId('message-screen')).not.toBeInTheDocument();
    expect(screen.queryByTestId('message-input')).not.toBeInTheDocument();
  });
});