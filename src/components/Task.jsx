import { Col, Card, Form, Button } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";

function Task({ title, removeTask }) {
  return (
    <Col md={6} className="task">
      <Card className="mt-3 mb-3">
        <Card.Body>
          <Card.Title className="d-flex">
            <Form.Group className="task-select-checkbox">
              <Form.Check type="checkbox" />
            </Form.Group>
            {title}
          </Card.Title>
          <Button
            variant="outline-secondary"
            size="sm"
            className="ms-1 float-end"
            onClick={removeTask}
          >
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
