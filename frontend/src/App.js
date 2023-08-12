import { useContext, useEffect } from "react";
import "./App.css";
import { funContext } from "./context/FunProvider";
import PlatForm from "./Pages/PlatForm";
import { Routes, Route } from "react-router-dom";
import Markets from "./Pages/Markets";
function App() {
  const { darkMode, pop, showInfo } = useContext(funContext);
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    if (pop || showInfo) {
      document.body.classList.add("pop");
    } else {
      document.body.classList.remove("pop");
    }
  }, [darkMode, pop, showInfo]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Markets />} />
        <Route path="/:id" element={<PlatForm />} />
      </Routes>
    </>
  );
}

export default App;
