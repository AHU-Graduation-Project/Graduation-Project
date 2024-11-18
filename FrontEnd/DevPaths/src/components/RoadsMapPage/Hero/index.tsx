import style from "./hero.module.scss"; // Link to the new CSS file

const Hero = () => {
  return (
    <div className={style.hero}>
      <div className={style.hero__content}>
        <div className={style.hero__text_container}>
          <h1 className={style.hero__header}>Browse And Create RoadMaps</h1>
          <p className={style.hero__description}>
            Find and browse real-world roadmaps based on your current skill set,
            and discover what is most in demand in the real world with our help.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
