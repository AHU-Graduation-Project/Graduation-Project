import { useState } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import "../../variables.scss";
import "../../UI-Kit.scss";
import Icon from "../../assets/icons/threeDots.svg";

export const Header = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <h3 className={styles.brand}>Dev Path</h3>
      <nav className={styles.navMenu}>
        <Link to="/">Home</Link>
        <Link to="/roadmaps">Roadmaps</Link>
        {/* TODO : Add conditional rendering for logged in when implementing appContext*/}
        <Link to="/progress">My Progress</Link>
        <Link to="/about">About Us</Link>
      </nav>
      <div className={styles.actions}>
        <button className="btn btn-primary">Login</button>
        <button className="btn btn-primary-outline">Register</button>
      </div>
      <div
        className={`${styles.mobileNav} ${
          isMobileNavOpen ? styles.isOpen : ""
        }`}
      >
        <nav className={styles.navMenu}>
        <Link to="/">Home</Link>
        <Link to="/roadmaps">Roadmaps</Link>
        {/* TODO : Add conditional rendering for logged in when implementing appContext*/}
        <Link to="/progress">My Progress</Link>
        <Link to="/about">About Us</Link>
        </nav>
      </div>
      <button
        className={styles.mobileNavToggle}
        onClick={toggleMobileNav}
        aria-label="Toggle mobile menu"
      >
        <image
          src="../../assets/icons/threeDots.svg"
          style={{ display: "inline-block", width: "10px", height: "10px" }}
        />
      </button>
    </header>
  );
};
