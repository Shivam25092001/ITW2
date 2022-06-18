import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./routes/login/login";
import Signup from "./routes/signup/signup";
import Home from "./routes/home/home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
