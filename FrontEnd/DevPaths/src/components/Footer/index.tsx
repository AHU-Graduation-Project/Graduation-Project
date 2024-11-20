import React from "react";
import styles from "./Footer.module.scss";
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

const FooterComponent: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content}>
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

        {/* Terms and Privacy Section */}
        <div className={styles.footer_terms}>
          <a href="/terms-of-use" className={styles.footer_link}>
            Terms of Use
          </a>
          <span className={styles.footer_separator}>|</span>
          <a href="/privacy-policy" className={styles.footer_link}>
            Privacy Policy
          </a>
        </div>

        {/* Location Section */}
        <div className={styles.location}>
          <p>Jordan</p>
        </div>

        {/* Separator (Divider) */}
        <div className={styles.separator}></div>

        {/* Footer Bottom */}
        <div className={styles.footer_bottom}>
          <p>© Dev Path 2024. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
