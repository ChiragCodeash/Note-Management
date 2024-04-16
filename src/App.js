import React from "react";
import ListNote from "./Componets/ListNote";
import { ToastContainer } from "react-toastify";
import InstallButton from "./Componets/Install";

const App = () => {
  return (
    <>
    <ToastContainer />
    <InstallButton/>
      <ListNote />
    </>
  );
};

export default App;
