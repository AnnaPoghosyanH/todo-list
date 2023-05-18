import { useEffect, useState, memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { PencilSquare, Trash, CheckLg, Flag } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import TaskApi from "../../api/taskApi";
import TaskModal from "../../components/taskModal/TaskModal";
import { formatDate } from "../../utils/helpers";
import styles from "./singleTask.module.css";
import { setLoader } from "../../redux/reducers/loaderSlice";

const taskApi = new TaskApi();

function SingleTask() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [isEditTaskModalShow, setIsEditTaskModalShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoader(true));
    taskApi
      .getSingle(taskId)
      .then((task) => {
        setTask(task);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  }, [taskId, dispatch]);

  const onEditTask = (editedTask) => {
    taskApi
      .update(editedTask)
      .then((updatedTask) => {
        setTask(updatedTask);
        toast.success("This task has been updated successfully!");
        setIsEditTaskModalShow(false);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const removeTaskById = () => {
    taskApi
      .delete(taskId)
      .then(() => {
        navigate("/");
        toast.success("This task has been deleted successfully!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <Container>
      <Row className="mt-5 pt-5 justify-content-center">
        <Col xs={12}>
          <Card className="mt-5 mb-2">
            {task ? (
              <Card.Body>
                {task.status === "active" ? (
                  <div className={styles.taskStatus}>
                    <Button
                      title="Mark as done"
                      variant="outline-danger"
                      size="sm"
                      className=" rounded-circle"
                      onClick={() =>
                        onEditTask({ status: "done", _id: task._id })
                      }
                    >
                      <Flag />
                    </Button>
                    <h5 className={styles.taskStatusTextActive}>
                      Status : {task.status}{" "}
                    </h5>
                  </div>
                ) : (
                  <div className={styles.taskStatus}>
                    <Button
                      title="Mark as active"
                      variant="outline-success"
                      size="sm"
                      className=" rounded-circle"
                      onClick={() =>
                        onEditTask({ status: "active", _id: task._id })
                      }
                    >
                      <CheckLg />
                    </Button>
                    <h5 className={styles.taskStatusTextDone}>
                      Status : {task.status}{" "}
                    </h5>
                  </div>
                )}
                <div className={styles.textBorder}>
                  <Card.Title className={styles.taskTitle}>
                    {task.title}
                  </Card.Title>
                  <Card.Text>{task.description}</Card.Text>
                </div>
                <div className="d-flex mt-3  flex-column gap-3">
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
                  onClick={removeTaskById}
                >
                  <Trash />
                </Button>
                <Button
                  title="Edit"
                  variant="outline-primary"
                  size="sm"
                  className="float-end "
                  onClick={() => setIsEditTaskModalShow(true)}
                >
                  <PencilSquare />
                </Button>
              </Card.Body>
            ) : (
              <h3>Task data is not found</h3>
            )}
          </Card>
        </Col>
        {isEditTaskModalShow && (
          <TaskModal
            onSave={onEditTask}
            onCancel={() => setIsEditTaskModalShow(false)}
            data={task}
          />
        )}
      </Row>
    </Container>
  );
}

export default memo(SingleTask);
