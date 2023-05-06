import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useRef } from "react";

function Contact() {
  const inputRefs = useRef([]);

  const handleClick = () => {
    inputRefs.current.forEach((inputElem) => {
      console.log(inputElem.value);
      inputElem.value = "";
    });
  };

  function addToRefsArr(ref) {
    if (!inputRefs.current.includes(ref)) {
      inputRefs.current.push(ref);
    }
  }

  return (
    <Container>
      <Row>
        <Col md="6">
          <Form>
            <Form.Group
              className="mt-4 justify-content-center"
              controlId="formBasicEmail"
            >
              <Form.Control
                className="mt-3"
                type="email"
                ref={addToRefsArr}
                placeholder="Enter email"
              />
              <Form.Control
                className="mt-3 mb-3"
                type="text"
                placeholder="Enter name"
                ref={addToRefsArr}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                ref={addToRefsArr}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleClick}>
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
