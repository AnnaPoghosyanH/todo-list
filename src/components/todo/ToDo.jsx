import { useCallback, Component } from "react";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import Task from "../task/Task";
import getUniqueId from "../../utils/helpers";
import ConfirmDialog from "../ConfirmDialog";
import styles from "./todo.module.css";

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTaskTitle: "",
      selectedTasks: new Set(),
    };
  }

  handleInputChange = (event) => {
    const newTaskTitle = event.target.value;
    this.setState({
      newTaskTitle,
    });
  };

  handleInputKeyDown = (event) => {
    if (event.code === "Enter") {
      this.addNewTask();
    }
  };

  addNewTask = () => {
    const trimmedTitle = this.state.newTaskTitle.trim();
    if (!trimmedTitle) {
      return;
    }

    const newTask = {
      id: getUniqueId(),
      title: trimmedTitle,
    };
    const tasks = [...this.state.tasks];
    tasks.push(newTask);
    this.setState({
      tasks,
      newTaskTitle: "",
    });
  };

  removeTaskById = (id) => {
    const { selectedTasks, tasks } = this.state;
    const newTasks = tasks.filter((task) => task.id !== id);

    const newState = { tasks: newTasks };

    if (selectedTasks.has(id)) {
      const newSelectedTasks = new Set(selectedTasks);
      newSelectedTasks.delete(id);
      newState.selectedTasks = newSelectedTasks;
    }
    this.setState(newState);
  };

  selectTaskById = (id) => {
    const selectedTasks = new Set(this.state.selectedTasks);
    if (selectedTasks.has(id)) {
      selectedTasks.delete(id);
    } else {
      selectedTasks.add(id);
    }
    this.setState({ selectedTasks });
  };

  deleteSelectedTasks = () => {
    const newTasks = [];
    const { selectedTasks, tasks } = this.state;

    tasks.forEach((task) => {
      if (!selectedTasks.has(task.id)) {
        newTasks.push(task);
      }
    });
    this.setState({
      tasks: newTasks,
      selectedTasks: new Set(),
    });
  };

  render() {
    const isAddNewTaskButtonDisabled = !this.state.newTaskTitle.trim();
    return (
      <div>
        <Container>
          <Row className="justify-content-md-center">
            <Col md={6}>
              <h1>My To Do List</h1>
              <InputGroup className="mb-3 mt-4">
                <Form.Control
                  placeholder="Input Task"
                  onChange={this.handleInputChange}
                  onKeyDown={this.handleInputKeyDown}
                  value={this.state.newTaskTitle}
                />
                <Button
                  variant="primary"
                  id="button-addon1"
                  onClick={this.addNewTask}
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
            {this.state.tasks.map((task) => {
              return (
                <Task
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  removeTask={this.removeTaskById}
                  selectTask={this.selectTaskById}
                />
              );
            })}
          </Row>
          <Button
            className={styles.deleteSelectedButton}
            variant="outline-danger"
            onClick={this.deleteSelectedTasks}
            disabled={!this.state.selectedTasks.size}
          >
            Delete Selected
          </Button>
          <ConfirmDialog />
        </Container>
      </div>
    );
  }
}

export default ToDo;
