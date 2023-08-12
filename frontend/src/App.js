import { useContext, useEffect, useState } from "react";
import "./App.css";
import { funContext } from "./context/FunProvider";
import PlatForm from "./Pages/PlatForm";
import { Routes, Route } from "react-router-dom";
function App() {
  const { darkMode, pop } = useContext(funContext);
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    if (pop) {
      document.querySelector(".container").classList.add("pop");
    } else {
      document.querySelector(".container").classList.remove("pop");
    }
  }, [darkMode, pop]);

  return (
    <>
      <Routes>
        <Route path="/:id" element={<PlatForm />} />
        {/* <Route path="/" element={<PlatForm />} /> */}
      </Routes>
    </>
  );
}

export default App;
