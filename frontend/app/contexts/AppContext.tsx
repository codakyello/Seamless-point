import { createContext, useContext } from "react";

const AppContext = createContext();
export function AppProvider({ children }) {
  const user = {
    role: "user",
  };
  return <AppContext.Provider value={{ user }}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (context === undefined)
    throw new Error("You tried to use app context outside app provider");

  return context;
}
