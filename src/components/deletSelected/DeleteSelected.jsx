import { useState, memo } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import ConfirmDialog from "../ConfirmDialog";
import styles from "./deleteSelected.module.css";

function DeleteSelected({ disabled, tasksCount, onSubmit }) {
  const [isConfirmDialogShow, setIsConfirmDialogShow] = useState(false);

  const toggleConfirmDialog = () => {
    setIsConfirmDialogShow(!isConfirmDialogShow);
  };

  return (
    <>
      <Button
        className={`${styles.deleteSelectedButton} rounded-pill`}
        variant="outline-danger"
        onClick={toggleConfirmDialog}
        disabled={disabled}
      >
        Delete Selected
      </Button>
      {isConfirmDialogShow && (
        <ConfirmDialog
          tasksCount={tasksCount}
          onCancel={toggleConfirmDialog}
          onSubmit={() => {
            onSubmit();
            toggleConfirmDialog();
          }}
        />
      )}
    </>
  );
}

DeleteSelected.propTypes = {
  disabled: PropTypes.bool.isRequired,
  tasksCount: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default memo(DeleteSelected);
