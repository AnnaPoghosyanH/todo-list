import { useState, useEffect } from "react";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import Task from "../task/Task";
import ConfirmDialog from "../ConfirmDialog";
import DeleteSelected from "../deletSelected/DeleteSelected";
import TaskApi from "../../api/taskApi";
import styles from "./todo.module.css";

const taskApi = new TaskApi();
function ToDo() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    taskApi.getAll().then((tasks) => {
      setTasks(tasks);
    });
  }, []);

  const handleInputChange = (event) => {
    setNewTaskTitle(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.code === "Enter") {
      addNewTask();
    }
  };

  const addNewTask = () => {
    const trimmedTitle = newTaskTitle.trim();
    if (!trimmedTitle) {
      return;
    }

    const newTask = {
      title: trimmedTitle,
    };

    taskApi.add(newTask).then((task) => {
      const tasksCopy = [...tasks];
      tasksCopy.push(task);
      setTasks(tasksCopy);
      setNewTaskTitle("");
    });
  };

  const removeTaskById = (id) => {
    const newTasks = tasks.filter((task) => task._id !== id);
    setTasks(newTasks);
    if (selectedTasks.has(id)) {
      const newSelectedTasks = new Set(selectedTasks);
      newSelectedTasks.delete(id);
      setSelectedTasks(newSelectedTasks);
    }
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
    const newTasks = [];
    tasks.forEach((task) => {
      if (!selectedTasks.has(task._id)) {
        newTasks.push(task);
      }
    });
    setTasks(newTasks);
    setSelectedTasks(new Set());
  };

  const isAddNewTaskButtonDisabled = !newTaskTitle.trim();
  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h1 className={styles.h1}>My To Do List</h1>
            <InputGroup className="mb-3 mt-4">
              <Form.Control
                placeholder="Input Task"
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                value={newTaskTitle}
              />
              <Button
                variant="primary"
                id="button-addon1"
                onClick={addNewTask}
                disabled={isAddNewTaskButtonDisabled}
              >
                Add
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-contentcenter">
          {tasks.map((task) => {
            return (
              <Task
                key={task._id}
                id={task._id}
                title={task.title}
                removeTask={setTaskToDelete}
                selectTask={selectTaskById}
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
      </Container>
    </div>
  );
}

export default ToDo;
