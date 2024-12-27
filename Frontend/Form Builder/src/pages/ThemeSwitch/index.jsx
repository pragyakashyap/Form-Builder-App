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
    setIsLightMode((prev) => !prev);
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
