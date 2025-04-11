import React from "react";
import { ThemeProvider, useTheme } from "./ThemeContext";
import "./styles.css";

export default function ThemeSwitch() {
  return (
    <ThemeProvider>
      <PageContent />
    </ThemeProvider>
  );
}
function PageContent() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="page-content">
      <div className="page-content-title">
        <span>Hello this is a theme switcher</span>
      </div>
      <div className="page-content-center">
        <button onClick={toggleTheme}>
          {theme === "light" ? "Light" : "Dark"}
        </button>
      </div>
      <p>This is some additional text </p>
    </div>
  );
}
