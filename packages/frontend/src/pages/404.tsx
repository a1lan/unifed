import React from "react";
import { Link } from "react-router-dom";
import "./../App.scss";

const buttonStyle = "Submit-button";

const PageNotFound = (): JSX.Element => {
  return (
    <div>
      <h1>Whoops!</h1>
      <Link to="/">
        <button className={buttonStyle}> Take me Home! </button>
      </Link>
    </div>
  );
};

export default PageNotFound;
