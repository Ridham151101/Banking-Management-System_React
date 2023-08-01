import { useEffect, useState } from "react";
import EmployeesTable from "../components/EmployeesTable";
import AddEmployeeButton from "../components/AddEmployeeButton";
import axios from "axios";

const Employees = ({ role }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8000/users");
        const users = response.data;
        // Filter the users to get only employees for admin role user
        const employeesData =
          role === "admin" || "employee"
            ? users.filter((user) => user.role === "employee")
            : users;
        setEmployees(employeesData);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, [role]); // Add role as a dependency to re-fetch when the role changes

  return (
    <>
      <div className="container">
        <h1>Employee List</h1>
        {role === "admin" && <AddEmployeeButton />}
        <EmployeesTable employees={employees} />
      </div>
    </>
  );
};

export default Employees;
