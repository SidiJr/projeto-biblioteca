import { useEffect } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import SubHeader from "./components/SubHeader";

function App() {
  // axios({
  //   method: 'get',
  //   url: 'https://fakerestapi.azurewebsites.net/'
  // })

  useEffect(() => {
    axios
      .get("https://fakerestapi.azurewebsites.net/api/v1/Books")
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

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
