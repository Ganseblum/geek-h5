import React from "react";
import { useRoutes } from "react-router-dom";
import route from "./route";

function App() {
  const outlet = useRoutes(route);
  return <div className="App">{outlet}</div>;
}

export default App;
