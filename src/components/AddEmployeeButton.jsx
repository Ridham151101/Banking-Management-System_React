import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const AddEmployeeButton = () => {
  return (
    <Link to="/add-employee">
      <Button variant="primary">Add Employee</Button>
    </Link>
  );
};

export default AddEmployeeButton;
