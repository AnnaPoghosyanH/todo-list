import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

function ConfirmDialog({ tasksCount, onCancel, onSubmit }) {
  return (
    <Modal show={true} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>
          Do you really want to delete {tasksCount !== 0 ? tasksCount : null}{" "}
          {tasksCount > 1 ? "tasks" : "task"}?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-evenly">
          <Button variant="danger" onClick={onSubmit}>
            Delete
          </Button>
          <Button variant="success" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

ConfirmDialog.propTypes = {
  tasksCount: PropTypes.number.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ConfirmDialog;
