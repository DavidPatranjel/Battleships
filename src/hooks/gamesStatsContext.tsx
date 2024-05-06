import React, { createContext, useContext, useState } from 'react';

const GameStatsContext = createContext({
  gamesWon: 0,
  gamesLost: 0,
  incrementGamesWon: () => {},
  incrementGamesLost: () => {},
});

export const useGameStats = () => useContext(GameStatsContext);

export const GameStatsProvider: React.FC = ({ children }) => {
  const [gamesWon, setGamesWon] = useState(0);
  const [gamesLost, setGamesLost] = useState(0);

  const incrementGamesWon = () => setGamesWon(prevCount => prevCount + 1);
  const incrementGamesLost = () => setGamesLost(prevCount => prevCount + 1);

  return (
    <GameStatsContext.Provider value={{ gamesWon, gamesLost, incrementGamesWon, incrementGamesLost }}>
      {children}
    </GameStatsContext.Provider>
  );
};
