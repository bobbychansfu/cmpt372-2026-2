// import { useState } from "react";
// import useFetchRandomUser from "./hooks/useFetchRandomUser";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { PersonsList, PersonModal } from "./components";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Login from "./components/Login/Login";

/*
type PersonType = {
  name: string;
  imgUrl: string
};

function Person({ user }: { user: PersonType }) {
  return (
    <Col sm={12} md={4} lg={3} className="mb-4">
      { user.name === "Loading..." ? (
        <div className="loading-container">
          <img src={img} alt="Loading..." className="spinning-img" />
        </div>
      ) : (
      <Card>
        <Card.Img variant="top" src={user.imgUrl} />
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
        </Card.Body>
      </Card>) }
    </Col>
  );
}

function PersonsList() {
  const [numUsers, setNumUsers] = useState(0);
  const { users, loading } = useFetchRandomUser(numUsers);

  return (
    <>
      <h2>People List</h2>

      <Container>
        <Row>
          {users.map((user, index) => (
            <Person key={index} user={user} />
          ))}

          {loading && <Person user={{ name: "Loading...", imgUrl: "" }} />}
        </Row>
      </Container>

      <button
        className="btn btn-primary"
        onClick={() => setNumUsers(prev => prev + 1)}
      >
        Load Random User
      </button>
    </>
  );
}

*/

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected route — equivalent of Angular's canActivate: [AuthGuard] */}
        <Route
          path="/people"
          element={
            <ProtectedRoute>
              <PersonsList />
            </ProtectedRoute>
          }
        >
          <Route path=":id" element={<PersonModal />} />
        </Route>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/people" replace />} />
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;