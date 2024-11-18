import style from "./cards.module.scss"; // Link to the new CSS file

interface CardProps {
  title: string;
}

const Cards: React.FC<CardProps> = ({ title = " " }) => {
  return (
    <a href="/" className={style.card}>
      <div className={style.card__container}>
        <p className={style.card__text}>{title}</p>
      </div>
    </a>
  );
};

export default Cards;
