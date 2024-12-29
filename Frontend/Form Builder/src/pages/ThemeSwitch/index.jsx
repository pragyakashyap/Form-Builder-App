import { useState, useEffect } from "react";
import styles from "./theme.module.css"

const ThemeSwitch = () => {
    const [isLightMode, setIsLightMode] = useState(false);
  useEffect(() => {
    localStorage.setItem("theme", isLightMode ? "light" : "dark");
    if (isLightMode) {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [isLightMode]);
  const toggleTheme = () => {
    const newTheme = isLightMode ? "dark" : "light";
    setIsLightMode(!isLightMode);
    localStorage.setItem("theme", newTheme);
  
    // Dispatch a custom event
    window.dispatchEvent(new Event("themeChange"));
  };
  
  return (
    <div className={styles.themeSwitch}>
      <span>Light</span>
      <div
        className={isLightMode ? `${styles.themeLight}` : `${styles.theme}`}
        onClick={toggleTheme}
      >
        <div className={styles.themeDiv}></div>
        <div
          className={
            isLightMode ? `${styles.themeClickLight}` : `${styles.themeClick}`
          }
        ></div>
      </div>
      <span>Dark</span>
    </div>
  );
};

export default ThemeSwitch;
