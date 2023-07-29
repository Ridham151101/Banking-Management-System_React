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
      </td>
    </tr>
  );
};

export default CustomerRow;
