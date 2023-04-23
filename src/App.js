import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./component/Footer";
import Navebar from "./component/Navbar";
import Contact from "./Contact";
import Home from "./Home";
import Profile from "./Profile";

function App() {
  return (
    <div className="flex font-mono flex-col justify-between p-5  text-black h-screen dark:text-white bg-[#ECF2FF] dark:bg-[#0f172a]">
      <BrowserRouter>
        <div>
          <Navebar />
        </div>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/contact" Component={Contact} />
          <Route path="/profile" Component={Profile} />
        </Routes>
        <div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
