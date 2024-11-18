import { useState } from "react";
import Divider from "./Divider/index";
import NewCard from "./NewCard/index";
import Hero from "./Hero/index";
import Lister from "./Lister/index";
import NavMenu from "./NavMenu/index";
import styles from "./roadsmappage.module.scss"; // Import the CSS module

const RoadMap: React.FC = () => {
  const [cards] = useState([
    {
      id: 1,
      title: "FrontEnd",
      description: "Best FrontEnd RoadMap",
      img: "/FRpic.jpeg",
    },
    {
      id: 2,
      title: "BackEnd",
      description: "Best BackEnd RoadMap",
      img: "/FRpic.jpeg",
    },
    {
      id: 3,
      title: "FullStack",
      description: "Best FullStack RoadMap",
      img: "/FRpic.jpeg",
    },
    {
      id: 4,
      title: "DevOps",
      description: "Best FullStack RoadMap",
      img: "/FRpic.jpeg",
    },
  ]);

  const listItems1 = [
    "BackEnd",
    "FullStack",
    "FrontEnd",
    "DevOps",
    "QA",
    "Game Development",
    "UX/UI",
    "IOS",
    "Android",
  ];

  const listItems2 = [
    "Computer Science",
    "React",
    "Angular",
    "JavaScript",
    "TypeScript",
    "HTML & CSS",
  ];

  return (
    <div className={styles.mainRoadmap}>
      <Hero />
      {/* ------------------------------- */}
      <NavMenu />
      {/* ------------------------------- */}
      <Divider text="Most Popular RoadMaps" />
      {/* ------------------------------- */}
      <div className={styles.cardSection}>
        {cards.map((card) => (
          <NewCard
            key={card.id}
            title={card.title}
            description={card.description}
            img={card.img}
          />
        ))}
      </div>
      {/* ------------------------------- */}
      <Divider text="Role-based Roadmaps" />
      {/* ------------------------------- */}
      <div className={styles.listerSection}>
        <Lister listItems={listItems1} />
      </div>
      {/* ------------------------------- */}
      <Divider text="Skill-based Roadmaps" />
      {/* ------------------------------- */}
      <div className={styles.listerSection}>
        <Lister listItems={listItems2} />
      </div>
      {/* ------------------------------- */}
    </div>
  );
};

export default RoadMap;
