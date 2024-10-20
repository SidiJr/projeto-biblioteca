import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EditingProvider } from "./contexts/EditingContext";

function App() {
  return (
    <>
      <ToastContainer />
      <div className="flex flex-col min-h-screen">
        <EditingProvider>
          <Header />
          <main className="flex-grow">
            <Outlet />
          </main>
        </EditingProvider>
        <Footer />
      </div>
    </>
  );
}

export default App;
