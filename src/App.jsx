import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import SubHeader from "./components/SubHeader";
import { useState } from "react";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header/>
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
