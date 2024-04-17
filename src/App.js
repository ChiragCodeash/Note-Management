import React from "react";
import ListNote from "./Componets/ListNote";
import { ToastContainer } from "react-toastify";
import InstallButton from "./Componets/Install";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<ListNote/>} />
        <Route path="/test" element={<InstallButton/>} />
      </Routes>
      {/* <InstallButton/> */}
      {/* <ListNote /> */}
    </>
  );
};

export default App;
