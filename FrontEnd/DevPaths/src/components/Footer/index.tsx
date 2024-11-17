import style from "./Footer.module.scss";
import NavSocial from "./NavSocial/index";
import twitterSvg from "../../assets/img/twitter.svg";
import facebookSvg from "../../assets/img/facebook.svg";

const Footer = () => {
  const link = "#";
  return (
    <footer className={style.footer}>
      <nav className={style.footer__links}>
        <a href="/" className={style.footer__link}>
          HomePage
        </a>
        <a href="/" className={style.footer__link}>
          RoadMaps
        </a>
        <a href="/" className={style.footer__link}>
          Contact Us
        </a>
      </nav>

      <nav className={style.footer__social}>
        <NavSocial link={link} imgSrc={twitterSvg} />
        <NavSocial link={link} imgSrc={facebookSvg} />
      </nav>

      <aside className={style.footer__copyright}>
        <p>
          Copyright © 2024 - All rights reserved by Dev Paths, AHU University
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
