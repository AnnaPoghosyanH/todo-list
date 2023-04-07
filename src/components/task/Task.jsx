import { Col, Card, Form, Button } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { memo } from "react";
import styles from "./task.module.css";

function Task({ id, title, removeTask, selectTask }) {
  return (
    <Col md={6} className="task">
      <Card className="mt-3 mb-3">
        <Card.Body>
          <Form.Check
            type="checkbox"
            className={styles.taskSelectCheckbox}
            onClick={() => selectTask(id)}
          />
          <Card.Title>{title}</Card.Title>
          <Card.Text>Description </Card.Text>
          <Button
            variant="outline-secondary"
            size="sm"
            className="ms-1 float-end"
            onClick={() => removeTask(id)}
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

export default memo(Task);
