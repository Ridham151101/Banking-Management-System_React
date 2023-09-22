import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const AddEmployeeButton = () => {
  return (
    <div className="add-employee-button">
      <Link to="/add-employee">
        <Button id="buttons">Add Employee</Button>
      </Link>
    </div>
  );
};

export default AddEmployeeButton;
