import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Header({ setQuery }: { setQuery: (query: string) => void }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="jumbotron text-center bg-light p-4 mb-4">
      <div className="d-flex justify-content-end">
        <Button variant="outline-secondary" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <h1>Random People App</h1>
      <Form.Group as={Row} controlId="searchInput">
        <Col sm="12" md="6" className="mx-auto">
          <Form.Control size="lg" type="text" placeholder="Search for a person..." onChange={(e) => setQuery(e.target.value)} />
        </Col>
      </Form.Group>
    </header>
  );
}

export default Header;