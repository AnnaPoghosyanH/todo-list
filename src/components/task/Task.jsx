import { memo } from "react";
import PropTypes from "prop-types";
import { formatDate } from "../../utils/helpers";
import { Col, Card, Form, Button } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import styles from "./task.module.css";

function Task(props){
  const task = props.dataTask;

  return (
    <Col md={6} className="task">
      <Card className="mt-3 mb-3">
        <Card.Body>
          <Form.Check
            type="checkbox"
            className={styles.taskSelectCheckbox}
            onChange={() => props.selectTask(task._id)}
            checked={props.checked}
          />
          <Card.Title className={styles.taskTitle}>{task.title}</Card.Title>
          <Card.Text className={styles.taskEllipsis}>
            {task.description}{" "}
          </Card.Text>
          <div className="d-flex flex-column gap-1">
            <h5 className={styles.taskStatus}>Status : {task.status} </h5>
            <span className={styles.taskCreatedAt}>
              Created At : {formatDate(task.created_at)}{" "}
            </span>
            <span className={styles.taskDedline}>
              Deadline : {formatDate(task.date)}{" "}
            </span>
          </div>
          <Button
            variant="outline-secondary"
            size="sm"
            className="ms-1 float-end"
            onClick={() => props.removeTask(task._id)}
          >
            <Trash />
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            className="float-end"
            onClick={() => props.editTask(task)}
          >
            <PencilSquare />
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

Task.propTypes = {
  dataTask: PropTypes.object.isRequired,
  removeTask: PropTypes.func.isRequired,
  selectTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default memo(Task);
