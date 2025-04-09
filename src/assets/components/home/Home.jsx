import React from "react";
import { routesConfig } from "../../../utils/routeConfig";
import { Link } from "react-router";

export default function Home() {
  return (
    <div className="questions-container">
      <h3>List of Questions</h3>
      <ul className="list-container">
        {routesConfig?.map(({ path, heading }) => (
          <Link to={path}>
            <li className="list-item">{heading}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
