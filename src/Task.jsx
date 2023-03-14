import { Col, Card, Form, Button } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";

function Task(props) {
  return (
    <Col md={6} className="task">
      <Card className="mt-3 mb-3">
        <Card.Body>
          <Card.Title>
            <Form.Group className="task-select-checkbox">
              <Form.Check type="checkbox" />
            </Form.Group>
            {props.title}
          </Card.Title>
          <Card.Text>{props.description}</Card.Text>
          <Button variant="outline-secondary" size="sm" className="ms-1 float-end">
            <Trash />
          </Button>
          <Button variant="outline-secondary" size="sm" className="float-end"> 
          <PencilSquare />
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Task;
