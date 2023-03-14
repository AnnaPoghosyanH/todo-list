import { Component } from "react";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import Task from "./Task";

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {
          id: ToDo.getUniqueId(),
          title: "Task 1",
          description: "Perform Task 1",
        },
        {
          id: ToDo.getUniqueId(),
          title: "Task 2",
          description: "Perform Task 2",
        },
        {
          id: ToDo.getUniqueId(),
          title: "Task 3",
          description: "Perform Task 3",
        },
      ],
    };
  }
  static getUniqueId() {
    return Math.random().toString(36) + Math.random().toString(36);
  }
  render() {
    return (
      <div>
        <Container>
          <Row className="justify-content-md-center">
            <Col md={6}>
              <h1>My To Do List</h1>
              <InputGroup className="mb-3 mt-4">
                <Form.Control placeholder="Input Task" />
                <Button variant="primary" id="button-addon1">
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
                <Task key={task.id} title={task.title} description={task.description} />
              );
            })}
          </Row>
        </Container>
      </div>
    );
  }
}

export default ToDo;
