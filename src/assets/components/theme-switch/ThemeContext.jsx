import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

// Create the theme context
const ThemeContext = createContext();

// Helper hook for children to get current value with safety check
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// Provider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  // Memoize the toggle function to prevent unnecessary re-renders
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";
      // Update body classes more efficiently
      document.body.classList.replace(prevTheme, newTheme);
      return newTheme;
    });
  }, []);

  // Initialize theme on mount
  useEffect(() => {
    // Use system preference if available
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = prefersDark ? "dark" : "light";

    document.body.classList.add(initialTheme);
    setTheme(initialTheme);

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("light", "dark");
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
