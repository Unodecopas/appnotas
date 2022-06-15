import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm";
import HomePage from "./pages/HomePage/HomePage";
import SingleNote from "./pages/NotesPage/SingleNote";
function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" exact element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/users/:username/:noteid" element={<SingleNote />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
