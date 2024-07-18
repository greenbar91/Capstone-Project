import { useState } from "react";
import { useModal } from "../../context/Modal";
import "./DeleteConfirmModal.css";

const DeleteConfirmModal = ({ handleDelete, type }) => {
  const { closeModal } = useModal();
  const [message, setMessage] = useState("Please confirm");
  const [showButtons, setShowButtons] = useState(true);

  const handleDeleteClick = () => {
    if (type === "logout") {
      setMessage("Logging out...");
      setShowButtons(false);
      handleDelete();

      setTimeout(() => {
        closeModal();
      }, 2000);
    } else {
      handleDelete();
      closeModal();
    }
  };

  return (
    <div className="delete-confirm-modal">
      <h3>{message}</h3>
      {showButtons && (
        <div className="delete-confirm-buttons">
          <button onClick={handleDeleteClick} className="confirm-delete-button">
            Confirm
          </button>
          <button onClick={closeModal} className="cancel-delete-button">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteConfirmModal;
