import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Navbar } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Task from "../task/Task";
import ConfirmDialog from "../ConfirmDialog";
import TaskModal from "../taskModal/TaskModal";
import DeleteSelected from "../deletSelected/DeleteSelected";
import Filters from "../filters/Filters";
import TaskApi from "../../api/taskApi";
import styles from "./todo.module.css";

const taskApi = new TaskApi();

function ToDo() {
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [editableTask, setEditableTask] = useState(null);
  const [isAddTaskModalShow, setIsAddTaskShow] = useState(false);

  const getTasks = (filters) => {
    taskApi
      .getAll(filters)
      .then((tasks) => {
        setTasks(tasks);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  const onAddNewTask = (newTask) => {
    taskApi
      .add(newTask)
      .then((task) => {
        const tasksCopy = [...tasks];
        tasksCopy.push(task);
        setTasks(tasksCopy);
        setIsAddTaskShow(false);
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
        toast.success("This task have been updated successfully!");
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
        <Row className="justify-content-md-center mb-3 ">
          <Col sm="4" lg="3">
            <Button
              variant="primary"
              id="button-addon1"
              onClick={() => setIsAddTaskShow(true)}
            >
              Add new task
            </Button>
          </Col>
          <Col sm="4" lg="3">
            <Button variant="warning" onClick={selectAllTasks}>
              Select all
            </Button>
          </Col>
          <Col sm="4" lg="3">
            <Button variant="secondary" onClick={resetSelectedTasks}>
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
        <Navbar
          collapseOnSelect
          expand="sm"
          variant="light"
          bg="light"
          fixed="bottom"
        >
          <DeleteSelected
            disabled={!selectedTasks.size}
            tasksCount={selectedTasks.size}
            onSubmit={deleteSelectedTasks}
          />
        </Navbar>

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
            onCancel={() => setIsAddTaskShow(false)}
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
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Container>
    </div>
  );
}

export default ToDo;
