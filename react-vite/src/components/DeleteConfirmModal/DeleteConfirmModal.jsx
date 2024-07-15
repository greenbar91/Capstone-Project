import { useDispatch } from 'react-redux';
import './DeleteConfirmModal.css';
import { useModal } from '../../context/Modal';

const DeleteConfirmModal = ({ identifiers, deleteAction }) => {
  const dispatch = useDispatch();
  const {closeModal} = useModal()


  const handleDeleteClick = () => {
    dispatch(deleteAction( identifiers ));
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
