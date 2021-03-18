import React from "react";
import { FaAndroid } from "react-icons/fa";
import { useSelector } from "react-redux";

function LandingPage() {
  const state = useSelector((state) => state);
  console.log(state);
  return (
    <>
      <div className="app">
        <FaAndroid style={{ fontSize: "8rem" }} />
        <span style={{ fontSize: "4rem" }}>Start!</span>
      </div>
      <div style={{ float: "right" }}> </div>
    </>
  );
}

export default LandingPage;
