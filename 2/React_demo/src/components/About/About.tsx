import { Accordion } from "react-bootstrap";

function About() {
    
  return (

    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>About This App</Accordion.Header>
        <Accordion.Body>
          <p>This app demonstrates fetching and displaying random user data from an API.</p>
          <p>Click the button on the home page to load random users and see their names and pictures.</p>
          <p>Built with React, React Router, and Bootstrap.</p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>

  );
}

export default About;