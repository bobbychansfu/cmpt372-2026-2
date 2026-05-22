import { Col, Card, Spinner } from "react-bootstrap";
//import img from "../../assets/react.svg";
import styles from "./Person.module.css";
import type { PersonType } from "../../../types/PersonType";
import { Link } from "react-router-dom";

// type PersonType = {
//   name: string;
//   imgUrl: string;
//   id: string;
// };

function Person({
  person,
  onDelete,
}: {
  person: PersonType;
  onDelete: (userToDelete: PersonType) => void;
}) {
  function handleDelete(userToDelete: PersonType) {
    // Implement delete logic here, e.g., call a prop function to remove the user from the list
    onDelete(userToDelete);
  }

  return (
    <>
      <Col sm={12} md={4} lg={3} className="mb-4">
        {person.id === -1 ? (
          <div className={styles.loadingContainer}>
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Card>
            <Link
              to={`/people/${person.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card.Img variant="top" src={person.imgUrl} />
              <Card.Body>
                <Card.Title>{person.name}</Card.Title>
              </Card.Body>
            </Link>
{/* need to import icons */}
            <i
              className={`bi bi-x-circle-fill ${styles.deleteIcon}`}
              onClick={() => handleDelete(person)}
            />
          </Card>
        )}
      </Col>
    </>
  );
}

export default Person;
