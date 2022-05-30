import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <div className="App">
      <header className="App-header">Header</header>
      <main>
        <Routes>
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
