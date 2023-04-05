import { Modal, Button } from "react-bootstrap";

function ConfirmDialog(props) {
  return (
    <Modal show={true} onHide={props.onCansel}>
      <Modal.Header closeButton>
        <Modal.Title>{props.tasksCount} {props.tasksCount > 1 ?  "selected tasks" : "selected task" } will be deleted permanently. Delete anyw?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-evenly">
          <Button variant="danger" onClick={props.onSubmit}>
            Delete
          </Button>
          <Button variant="success" onClick={props.onCansel}>
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ConfirmDialog;
