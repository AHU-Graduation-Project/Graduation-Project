import { Link } from "react-router-dom";
import style from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={style.notFoundContainer}>
      <h1>404</h1>
      <h4>Not Found</h4>
      <button className="btn btn-primary">
        <Link to="/">Go Back</Link>
      </button>
    </div>
  );
};

export default NotFound;
