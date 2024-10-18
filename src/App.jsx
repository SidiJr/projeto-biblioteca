import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import SubHeader from "./components/SubHeader";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <SubHeader />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
