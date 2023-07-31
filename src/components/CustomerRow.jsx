import { Link } from "react-router-dom";

const CustomerRow = ({ customer, handleCreateAccount }) => {
  return (
    <tr key={customer.id}>
      <td>{customer.name}</td>
      <td>{customer.email}</td>
      <td>{customer.phone}</td>
      <td>{customer.accountRequestStatus}</td>
      <td>
        {customer.accountRequestStatus === "pending" && (
          <button
            onClick={() => handleCreateAccount(customer.id)}
            className="btn btn-primary"
          >
            Approve
          </button>
        )}

        {customer.accountRequestStatus === "approved" && (
          <Link
            to={`/account-details/${customer.id}`}
            className="btn btn-primary"
          >
            View Account Details
          </Link>
        )}
      </td>
    </tr>
  );
};

export default CustomerRow;
