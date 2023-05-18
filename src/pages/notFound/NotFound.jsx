import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import notFoundImage from "../../assets/images/notFoundImage.jpg";
import styles from "./notFound.module.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="p-5 text-center">
      <h1 className={styles.h1}>404</h1>
      <h3 className={styles.h3}> The page you are looking does not exist</h3>
      <div className="m-4">
        {" "}
        <img src={notFoundImage} alt="NotFoundPageImage" />
      </div>
      <Button className="m-4" onClick={() => navigate("/")}>
        GO HOME
      </Button>
    </div>
  );
}

export default NotFound;
