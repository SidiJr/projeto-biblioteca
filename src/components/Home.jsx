import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

function Home() {
  const { setTitle } = useOutletContext();
  useEffect(() => {
    setTitle("Home");
  }, [setTitle]);
  return (
    <div>
      <h1>Home Page</h1>
      <p>Bem-vindo!</p>
    </div>
  );
}

export default Home;
