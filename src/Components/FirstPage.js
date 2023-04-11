import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const FirstPage = () => {
  return (
    <div className="App">
      <h1
        style={{
          position: "fixed",
          top: "25%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        Please make a selection
      </h1>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Link to="/building">
          <button
            style={{
              width: "200px",
              height: "100px",
              fontSize: "30px",
              padding: "10px",
              margin: "10px",
            }}
          >
            Building
          </button>
        </Link>
        <Link to="/apartment">
          <button
            style={{
              width: "200px",
              height: "100px",
              fontSize: "30px",
              padding: "10px",
              margin: "10px",
            }}
          >
            Apartment
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FirstPage;
