import React from "react";
import { AppRoutes } from "./routes/AppRoutes";
import { YTestbookContextProvider } from "./context/useYTestbookContext";

const App: React.FC = () => {
  return (
    <div className="App">
      <YTestbookContextProvider>
        <AppRoutes />
      </YTestbookContextProvider>
    </div>
  );
};

export default App;
