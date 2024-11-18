import React from "react";
import style from "./Newcard.module.scss"; // Link to the new CSS file

interface CardProps {
  title: string;
  description: string;
  img: string;
}

const NewCard: React.FC<CardProps> = ({ title, description, img }) => {
  return (
    <div className={style.new_card}>
      <figure className={style.new_card__figure}>
        <img className={style.new_card__image} src={img} alt={title} />
      </figure>
      <div className={style.new_card__body}>
        <h2 className={style.new_card__title}>{title}</h2>
        <p className={style.new_card__description}>{description}</p>
        <div className={style.new_card__actions}>
          <button className={style.new_card__button}>Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default NewCard;
