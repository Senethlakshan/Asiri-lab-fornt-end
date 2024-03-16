
import '../css/Dashbord.css';

const DeleteConfomDashbord = () => {
  return (
    <div className="delete-confirmation-container">
      <div className="delete-confirmation-box">
        <h2>Confirm Deletion!</h2>
        <p>Are you sure you want to delete this profile? This action cannot be undone.</p>
        <div className="button-container">
          <button  className="delete-button">
            Delete
          </button>
          <button className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfomDashbord;
