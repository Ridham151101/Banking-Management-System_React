import React from "react";
import EmployeeTransaction from "./EmployeeTransaction";
import CustomerTransaction from "./CustomerTransaction";

function Transactions({ userId, role }) {
  return (
    <div className="mt-3">
      {role === "admin" || role === "employee" ? (
        <EmployeeTransaction employeeId={userId} />
      ) : (
        <CustomerTransaction customerId={userId} />
      )}
    </div>
  );
}

export default Transactions;
