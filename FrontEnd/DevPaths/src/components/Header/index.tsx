// just a test file, not completed
import style from "./Header.module.scss";

export const Header = () => {
  return (
    <div className={style.header}>
      <div className={style.brand}>
        <img src="public/logo.png" alt="Dev Path Logo" />
        <h3>Dev Path</h3>
      </div>
      <nav className={style.navMenu}>
        <a href="">home</a>
        <a href="">roadmap</a>
        <a href="">My Progress</a>
        <a href="">about us</a>
      </nav>
      <div className={style.searchBar + " hidden-lg"}>
      <i className="bi bi-search"></i>
      </div>
    </div>
  );
};
