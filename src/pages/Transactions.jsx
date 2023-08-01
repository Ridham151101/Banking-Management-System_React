import React from "react";
import EmployeeTransaction from "./EmployeeTransaction";
import CustomerTransaction from "./CustomerTransaction";

function Transactions({ userId, role }) {
  return (
    <>
      {role === "admin" || role === "employee" ? (
        <EmployeeTransaction employeeId={userId} />
      ) : (
        <CustomerTransaction customerId={userId} />
      )}
    </>
  );
}

export default Transactions;
