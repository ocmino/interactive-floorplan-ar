import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const FirstPage = () => {
  return (
    <div className="FirstPage">
      <div className="FirstPage__header" />
      <div className="FirstPage__body">
        <Link to="/building">
          <button className="FirstPage__button">Building</button>
        </Link>
        <Link to="/apartment">
          <button className="FirstPage__button">Apartment</button>
        </Link>
        </div>
    </div>
  );
};

export default FirstPage;
