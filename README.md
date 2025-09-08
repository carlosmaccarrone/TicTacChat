[![CI](https://github.com/carlosmaccarrone/TicTacChat/actions/workflows/ci.yml/badge.svg)](https://github.com/carlosmaccarrone/TicTacChat/actions/workflows/ci.yml)

# TicTacChat Front

TicTacChat is a demo frontend application that showcases event-driven programming in a multiplayer context. It allows users to chat and play Tic-Tac-Toe (Noughts and Crosses) against either the CPU or other users in private game rooms.

---

## Features

- Unique Nicknames: Users must enter a unique nickname to join. Duplicate nicknames are not allowed.
- Lobby Chat: A shared in-memory chat room where all connected users can communicate for up to one hour.
- Tic-Tac-Toe Game Modes:
	- Play against the CPU.
	- Challenge other users to a private game room with chat support.
- Game Flow Control: After each match, a confirmation button ensures both players agree to start a new round, enabling continuous gameplay.
- Event-Driven Backend: The frontend communicates exclusively via WebSockets with a socket-based backend.

---

## Pages

1. Pages
- Nickname Page (Login)
- Users input a unique nickname.
- Handles nickname validation and session initialization.

2. Lobby Page
- Displays a list of connected users.
- Includes a shared chat.
- Allows users to challenge others to a Tic-Tac-Toe match or play against the CPU.

3. GamePlay Page
- Private game room for CPU or PvP matches.
- Includes a dedicated chat for the private game.
- Handles turn-taking and game confirmations.

---

## Technology Stack

- React – Frontend library for building UI components.
- Webpack – Module bundler and build tool.
- Babel – JavaScript transpiler for ES6+ support.
- React Router – Client-side routing.
- Jest – Unit and integration testing.
- cross-env – Cross-platform environment variable support.
- CSS Modules – Scoped CSS for component styles.
- copy-webpack-plugin – Copies static assets to the build folder.

---

## Installation

1. Clone the repository:
```bash
git clone 
cd tictacchat-front
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm start
```

---

## Installation

The frontend uses Jest for unit and integration testing:

```bash
npm test
```
Tests cover the main pages (Nickname, Lobby, GamePlay) and components, including event handling, chat, and gameplay interactions.

---

## Notes

- The application is designed as a demo and does not persist chat messages or game history beyond the session.
- All gameplay and chat data are handled in-memory.
- The backend is assumed to be a WebSocket-only socket server; no REST API integration is required.

This README provides a complete overview for developers or reviewers who want to explore the event-driven frontend architecture of TicTacChat.

---

License

MIT © 2025