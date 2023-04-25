import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import About from "./components/About/About";
import Form from "./components/Form/Form";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import { Detail } from "./components/Detail/Detail";
import Error from "./components/Error/Error";
function App() {
  const { pathname } = useLocation();
  return (
    <div>
      {pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/form" element={<Form />} />
        <Route path="*" element={<Error />} />
      </Routes>
      {pathname !== "/" && <Footer/>}
    </div>
  );
}

export default App;
