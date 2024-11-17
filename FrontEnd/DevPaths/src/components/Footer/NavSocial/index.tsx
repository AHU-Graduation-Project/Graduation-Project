import style from "./NavSocial.module.scss";

interface indexProps {
  link: string;
  imgSrc: string;
}

const index = ({ link, imgSrc }) => {
  return (
    <a href={link} aria-label="Twitter" className={style.footer__icon}>
      <img src={imgSrc} />
    </a>
  );
};

export default index;
