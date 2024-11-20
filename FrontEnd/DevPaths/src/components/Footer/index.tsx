import React from "react";
import styles from "./Footer.module.scss";
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

const FooterComponent: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content}>
        {/* Footer Brand (Centered) */}
        <div className={styles.footer_brand}>
          <a href="/" className={styles.footer_logo}>
            <img
              src="/logo.png"
              alt="DevPath Logo"
              className={styles.logo_image}
            />
            Dev Path
          </a>
        </div>

        {/* Social Media Icons */}
        <div className={styles.social_media}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        </div>

        {/* Separator (Divider) */}
        <div className={styles.separator}></div>

        {/* Footer Bottom */}
        <div className={styles.footer_bottom}>
          <p>© Dev Path 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
