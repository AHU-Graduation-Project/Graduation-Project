import Cards from "../Cards/index"; // Reuse the Cards component
import styles from "./lister.module.scss"; // Import the CSS module

interface CardsProps {
  listItems: string[];
}

const Lister: React.FC<CardsProps> = ({ listItems }) => {
  return (
    <div className={styles.container}>
      {listItems.map((item, index) => (
        <Cards key={index} title={item} />
      ))}
    </div>
  );
};

export default Lister;
