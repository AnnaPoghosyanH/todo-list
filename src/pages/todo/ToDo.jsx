import { useState, useEffect, memo } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import Task from "../../components/task/Task";
import ConfirmDialog from "../../components/ConfirmDialog";
import TaskModal from "../../components/taskModal/TaskModal";
import DeleteSelected from "../../components/deletSelected/DeleteSelected";
import Filters from "../../components/filters/Filters";
import TaskApi from "../../api/taskApi";
import { setTasksCount } from "../../redux/reducers/tasksSlice";
import { setLoader } from "../../redux/reducers/loaderSlice";
import styles from "./todo.module.css";

const taskApi = new TaskApi();

function ToDo() {
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [editableTask, setEditableTask] = useState(null);
  const [isAddTaskModalShow, setIsAddTaskModalShow] = useState(false);

  const tasksCount = useSelector((store) => store.tasksCount.count);
  const dispatch = useDispatch();

  const getTasks = (filters) => {
    dispatch(setLoader(true));
    taskApi
      .getAll(filters)
      .then((tasks) => {
        setTasks(tasks);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    dispatch(setTasksCount(tasks.length));
  }, [tasks.length]);

  const onAddNewTask = (newTask) => {
    taskApi
      .add(newTask)
      .then((task) => {
        const tasksCopy = [...tasks];
        tasksCopy.push(task);
        setTasks(tasksCopy);
        setIsAddTaskModalShow(false);
        toast.success(`A new task has been added seccessfully!`);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const removeTaskById = (id) => {
    taskApi
      .delete(id)
      .then(() => {
        const newTasks = tasks.filter((task) => task._id !== id);
        setTasks(newTasks);
        if (selectedTasks.has(id)) {
          const newSelectedTasks = new Set(selectedTasks);
          newSelectedTasks.delete(id);
          setSelectedTasks(newSelectedTasks);
        }
        toast.success("This task has been deleted successfully!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const selectTaskById = (id) => {
    const selectedTasksCopy = new Set(selectedTasks);
    if (selectedTasksCopy.has(id)) {
      selectedTasksCopy.delete(id);
    } else {
      selectedTasksCopy.add(id);
    }
    setSelectedTasks(selectedTasksCopy);
  };

  const deleteSelectedTasks = () => {
    taskApi
      .deleteMany([...selectedTasks])
      .then(() => {
        const newTasks = [];
        const deletedTasksCount = selectedTasks.size;
        tasks.forEach((task) => {
          if (!selectedTasks.has(task._id)) {
            newTasks.push(task);
          }
        });
        setTasks(newTasks);
        setSelectedTasks(new Set());
        toast.success(
          deletedTasksCount > 1
            ? `${deletedTasksCount} tasks have been deleted successfully!`
            : `${deletedTasksCount} task has been deleted successfully!`
        );
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const selectAllTasks = () => {
    const taskIds = tasks.map((task) => task._id);
    setSelectedTasks(new Set(taskIds));
  };

  const resetSelectedTasks = () => {
    setSelectedTasks(new Set());
  };

  const onEditTask = (editedTask) => {
    taskApi
      .update(editedTask)
      .then((updatedTask) => {
        const updatedTasksCopy = [...tasks];
        const updatedTasksToSave = updatedTasksCopy.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        );
        setTasks(updatedTasksToSave);
        toast.success("This task has been updated successfully!");
        setEditableTask(null);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const onFilter = (filters) => {
    getTasks(filters);
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h1 className={styles.h1}>My To Do List</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center mb-3 "></Row>
        <Row>
          <Col sm="6" lg="3" className={styles.buttonCol}>
            <h3 className={styles.h3}>Number of tasks: {tasksCount}</h3>
          </Col>
          <Col sm="6" lg="3" className={styles.buttonCol}>
            <Button
              className="rounded-pill"
              variant="primary"
              id="button-addon1"
              onClick={() => setIsAddTaskModalShow(true)}
            >
              Add new task
            </Button>
          </Col>
          <Col sm="6" lg="3" className={styles.buttonCol}>
            <Button
              className="rounded-pill"
              variant="warning"
              onClick={selectAllTasks}
            >
              Select all
            </Button>
          </Col>
          <Col sm="6" lg="3" className={styles.buttonCol}>
            <Button
              className="rounded-pill"
              variant="secondary"
              onClick={resetSelectedTasks}
            >
              Reset selected
            </Button>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Filters onFilter={onFilter} />
          </Col>
        </Row>

        <Row className="justify-content-center">
          {tasks.map((task) => {
            return (
              <Task
                key={task._id}
                dataTask={task}
                removeTask={setTaskToDelete}
                selectTask={selectTaskById}
                editTask={setEditableTask}
                checked={selectedTasks.has(task._id)}
                onStatusChange={onEditTask}
              />
            );
          })}
        </Row>
        <DeleteSelected
          disabled={!selectedTasks.size}
          tasksCount={selectedTasks.size}
          onSubmit={deleteSelectedTasks}
        />
        {taskToDelete && (
          <ConfirmDialog
            tasksCount={1}
            onCancel={() => setTaskToDelete(null)}
            onSubmit={() => {
              removeTaskById(taskToDelete);
              setTaskToDelete(null);
            }}
          />
        )}
        {isAddTaskModalShow && (
          <TaskModal
            onCancel={() => setIsAddTaskModalShow(false)}
            onSave={onAddNewTask}
          />
        )}

        {editableTask && (
          <TaskModal
            onCancel={() => setEditableTask(null)}
            onSave={onEditTask}
            data={editableTask}
          />
        )}
      </Container>
    </div>
  );
}

export default memo(ToDo);
