import { Component } from "react";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import Task from "./Task";
import getUniqueId from "../utils/helpers";

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTaskTitle: "",
    };
  }

  handleInputChange = (event) => {
    const newTaskTitle = event.target.value;
    this.setState({
      newTaskTitle,
    });
  };

  handleInputKeyDown = (event) => {
    if(event.code === "Enter"){
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
    this.setState((state, props) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
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
          <Row className="justify-content-md-center">
            {this.state.tasks.map((task) => {
              return (
                <Task
                  key={task.id}
                  title={task.title}
                  removeTask={() => this.removeTaskById(task.id)}
                />
              );
            })}
          </Row>
        </Container>
      </div>
    );
  }
}

export default ToDo;
