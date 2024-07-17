import { useModal } from "../../context/Modal";
import "./DeleteConfirmModal.css";

const DeleteConfirmModal = ({ handleDelete }) => {
  const { closeModal } = useModal();

  const handleDeleteClick = () => {
    handleDelete();
    closeModal();
  };

  return (
    <div className="delete-confirm-modal">
      <h3>Are you sure you want to delete?</h3>
      <div className="delete-confirm-buttons">
        <button onClick={handleDeleteClick} className="confirm-delete-button">
          Delete
        </button>
        <button onClick={closeModal} className="cancel-delete-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
