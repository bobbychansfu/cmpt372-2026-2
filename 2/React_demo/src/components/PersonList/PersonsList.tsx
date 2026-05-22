import { useState } from "react";
import useFetchRandomPerson from "../../hooks/useFetchRandomPerson";
import { Container, Row } from "react-bootstrap";
import { Person, About, Header } from "..";
import type { PersonType } from "../../types/PersonType";
import { Outlet } from "react-router-dom";

function PersonsList() {
  const [numPersons, setNumPersons] = useState(0);
  const { people, loading, setPeople } = useFetchRandomPerson(numPersons);
  const [query, setQuery] = useState("");

  const filteredPeople = people.filter(person => person.name.toLowerCase().includes(query.toLowerCase()));

  function handleDelete(personToDelete: PersonType) {
    // Implement delete logic here, e.g., call a prop function to remove the user from the list
    // console.log("Delete user with ID:", userToDelete.id);
    setPeople(prevPeople => prevPeople.filter(person => person.id !== personToDelete.id));
  }
  return (
    <>
      <Header setQuery={setQuery} />
      <Container>
        <Row>
          {filteredPeople.map((person, index) => (
            <Person key={index} person={person} onDelete={handleDelete} />
          ))}

          {loading && <Person person={{ seed:"", id: -1, name: "Loading...", imgUrl: "" }} onDelete={handleDelete} />}
        </Row>
      </Container>
      
      <button
        className="btn btn-primary"
        onClick={() => setNumPersons(prev => prev + 1)}
      >
        Load Random Person
      </button>

      <hr />
      <About />
    
      <Outlet context={{people}} /> 
    </>
  );
}

export default PersonsList;