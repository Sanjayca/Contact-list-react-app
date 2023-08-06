import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; // Import necessary hooks
import { toast } from "react-toastify"; // Import toast notifications

const EditContact = ({ contacts, setContacts }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setNumber] = useState("");

  // Get the 'id' parameter from the URL
  const { id } = useParams();

  const navigate = useNavigate(); // React Router's navigation function
  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );

  // Populate the form fields with current contact data on load
  useEffect(() => {
    if (currentContact) {
      setName(currentContact.name);
      setEmail(currentContact.email);
      setNumber(currentContact.phone);
    }
  }, [currentContact]);

  // Function to handle updating a contact
  const handleUpdateContact = async () => {
    if (!email || !phone || !name) {
      return toast.warning("Please fill in all fields!"); // Display a warning toast
    }

    // Check if email or phone number already exist in other contacts
    const checkEmail = contacts.find(
      (contact) => contact.id !== parseInt(id) && contact.email === email
    );
    const checkNumber = contacts.find(
      (contact) =>
        contact.id !== parseInt(id) && contact.phone === parseInt(phone)
    );

    // Display an error toast if email already exists
    if (checkEmail) {
      return toast.error("This email already exists!");
    }

    // Display an error toast if phone number already exists
    if (checkNumber) {
      return toast.error("This number already exists!");
    }

    // Create an object with updated contact details
    const updatedContact = {
      name,
      email,
      phone,
    };

    try {
      // Send a PUT request to update the contact
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedContact),
      });

      // Update the contacts state with the updated contact
      const updatedContacts = contacts.map((contact) =>
        contact.id === parseInt(id)
          ? { ...contact, ...updatedContact }
          : contact
      );

      setContacts(updatedContacts);
      toast.success("Contact updated successfully!"); // Display a success toast
      navigate("/"); // Navigate back to the home page
    } catch (error) {
      console.error("Error updating contact:", error);
      toast.error("Failed to update contact."); // Display an error toast
    }
  };
  return (
    <div className="container">
      {currentContact ? (
        <>
          <h1 className="display-3 text-center fw-bold">Edit Contact {id}</h1>
          <div className="row">
            <div className="col-md-6 shadow mx-auto p-5">
              <form className="text-center" onSubmit={handleUpdateContact}>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="number"
                    placeholder="Phone Number"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn btn-dark"
                  />
                  <Link to="/" className="btn btn-danger ms-3 ">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <h1 className="display-3 my-5 text-center fw-bold">
          Contact with id {id} does not exists!!
        </h1>
      )}
    </div>
  );
};

export default EditContact;
