import { useEffect } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

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
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
