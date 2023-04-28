import { memo } from "react";
import PropTypes from "prop-types";
import { formatDate } from "../../utils/helpers";
import { Col, Card, Form, Button } from "react-bootstrap";
import {
  PencilSquare,
  Trash,
  CheckLg,
  ClockHistory,
} from "react-bootstrap-icons";
import styles from "./task.module.css";

function Task(props) {
  const task = props.dataTask;

  return (
    <Col sm={12} xl={6} className="task">
      <Card className="mt-2 mb-2">
        <Card.Body>
          <div className={styles.taskStatusCheckbox}>
            <Form.Check
              type="checkbox"
              className={styles.taskSelectCheckbox}
              onChange={() => props.selectTask(task._id)}
              checked={props.checked}
            />
            <h5 className={`${styles.taskStatus} `}>Status : {task.status} </h5>
          </div>

          <div className={styles.textBorder}>
            <Card.Title className={styles.taskTitle}>{task.title}</Card.Title>
            <Card.Text className={styles.taskEllipsis}>
              {task.description}{" "}
            </Card.Text>
          </div>

          <div className="mt-3  justify-content-end">
            <span className={styles.taskCreatedAt}>
              Created At : {formatDate(task.created_at)}{" "}
            </span>
            <span className={styles.taskDedline}>
              Deadline : {formatDate(task.date)}{" "}
            </span>
          </div>

          <Button
            title="Delete"
            variant="outline-danger"
            size="sm"
            className="ms-1 float-end"
            onClick={() => props.removeTask(task._id)}
          >
            <Trash />
          </Button>
          <Button
            title="Edit"
            variant="outline-primary"
            size="sm"
            className="float-end "
            onClick={() => props.editTask(task)}
          >
            <PencilSquare />
          </Button>

          {task.status === "active" ? (
            <Button
              title="Mark as done"
              variant="outline-success"
              size="sm"
              className="me-1 float-end"
              onClick={() =>
                props.onStatusChange({ status: "done", _id: task._id })
              }
            >
              <CheckLg />
            </Button>
          ) : (
            <Button
              title="Mark as active"
              variant="outline-info"
              size="sm"
              className="me-1 float-end "
              onClick={() =>
                props.onStatusChange({ status: "active", _id: task._id })
              }
            >
              <ClockHistory />
            </Button>
          )}
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
  onStatusChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default memo(Task);
