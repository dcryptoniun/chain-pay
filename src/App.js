import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./component/Footer";
import Navebar from "./component/Navbar";
import Home from "./Home";
import Profile from "./Profile";
import Info from "./Info";

function App() {
  return (
    <div className="flex font-mono flex-col justify-between  text-slate-900 dark:text-slate-100 bg-[#ECF2FF] dark:bg-[#0f172a]">
      <BrowserRouter>
        <div>
          <Navebar />
        </div>
        <Routes>
          <Route path="/" Component={Home} />

          <Route path="/profile" Component={Profile} />
        </Routes>
        <section className="">
          <Info />
        </section>
        <div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
