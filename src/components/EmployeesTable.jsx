import { Table } from "react-bootstrap";

const EmployeesTable = ({ employees }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.phone}</td>
            <td>{employee.gender}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default EmployeesTable;
