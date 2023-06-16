import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Mainlayout = ({ children, setsearch, search, cartUpdated }) => {
  const [isAnyModalOpen, setisAnyModalOpen] = useState(false);

  const handleModalBackdrop = (value) => {
    setisAnyModalOpen(value);
  };
  return (
    <>
      <div className={isAnyModalOpen ? "app-active" : "app"}>
        <Header handleModalBackdrop={handleModalBackdrop} setsearch={setsearch} search={search} cartUpdated={cartUpdated} />
        <div>{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Mainlayout;
