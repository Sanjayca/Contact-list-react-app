import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; // Importing toast notifications

const Home = ({ contacts, setContacts }) => {
  // Function to handle deleting a contact
  const handleDeleteContact = async (id) => {
    try {
      // Send a DELETE request to the API to delete the contact
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "DELETE",
      });

      // Update the contacts state by filtering out the deleted contact
      const updatedContacts = contacts.filter((contact) => contact.id !== id);
      setContacts(updatedContacts);

      toast.success("Contact deleted successfully!"); // Display a success toast
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete contact."); // Display an error toast
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 my-5 text-end">
          <Link to="/add" className="btn btn-outline-dark">
            Add Contact
          </Link>
        </div>
        <div className="col-md-10 mx-auto">
          <table className="table table-hover">
            <thead className="text-white bg-dark text-center">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Number</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, id) => (
                <tr key={id}>
                  <td>{id + 1}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>
                    <Link
                      to={`/edit/${contact.id}`}
                      className="btn btn-small btn-primary me-2"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDeleteContact(contact.id)}
                      className="btn btn-small btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
