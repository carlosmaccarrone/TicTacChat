import { renderHook, act } from "@testing-library/react";
import { jest } from "@jest/globals";

const emitMock = jest.fn();

jest.unstable_mockModule('@/contexts/SessionContext', () => ({
  useSession: () => ({ nickname: "Charly" }),
}));
jest.unstable_mockModule('@/contexts/SocketContext', () => ({
  useSocket: () => ({ socket: { emit: emitMock } }),
}));
jest.unstable_mockModule('react-router-dom', () => ({
  useSearchParams: () => [{ get: () => "pvp" }],
}));

const { useNotifyDisconnect } = await import('./useNotifyDisconnect.jsx');

describe('useNotifyDisconnect', () => {
  beforeEach(() => {
    emitMock.mockClear();
  });

  test('notifyLeave emite evento correctamente', () => {
    const { result } = renderHook(() => useNotifyDisconnect());
    const notifyLeave = result.current;

    act(() => {
      notifyLeave(true);
    });

    expect(emitMock).toHaveBeenCalledWith('pvp:leaveRoom', { nickname: "Charly", voluntary: true });
  });

  test('emite pvp:leaveRoom al beforeunload', () => {
    const { unmount } = renderHook(() => useNotifyDisconnect());

    const event = new Event('beforeunload');
    act(() => {
      window.dispatchEvent(event);
    });

    expect(emitMock).toHaveBeenCalledWith('pvp:leaveRoom', { nickname: "Charly", voluntary: false });

    unmount();
  });
});