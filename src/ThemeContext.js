import React from "react";

const themes = {
  icon: {
    fontSize: 100
  },
  elevation: 3
};

const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => (
  <ThemeContext.Provider value={themes}>{children}</ThemeContext.Provider>
);

export { ThemeContext, ThemeProvider };
