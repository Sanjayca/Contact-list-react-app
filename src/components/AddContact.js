import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddContact = ({ contacts, setContacts }) => {
  // State variables to store input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setNumber] = useState("");

  // React Router's navigation function
  const navigate = useNavigate();

  // Function to handle adding a new contact
  const handleAddContact = async (e) => {
    e.preventDefault();
    // Check for empty fields
    if (!email || !phone || !name) {
      return toast.warning("Please fill in all fields!");
    }
    // Check if email or phone number already exist in the contacts
    const checkEmail = contacts.find(
      (contact) => contact.email === email && email
    );
    const checkPhone = contacts.find(
      (contact) => contact.number === parseInt(phone) && parseInt(phone)
    );
    // Display an error toast if email already exists
    if (checkEmail) {
      return toast.error("This email already exists!");
    }
    // Display an error toast if phone number already exists
    if (checkPhone) {
      return toast.error("This phone number already exists!");
    }
    // Create a new contact object
    const newContact = { name, email, phone };
    try {
      // Send a POST request to the API to add the new contact
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newContact),
        }
      );
      const data = await response.json();

      // Update the contacts state with the new contact
      setContacts([...contacts, { ...data, id: contacts.length + 1 }]);
      toast.success("Contact added successfully!");

      // Navigate back to the home page
      navigate("/");
    } catch (error) {
      console.error("Error adding contact:", error);
      toast.error("Failed to add contact.");
    }
  };

  return (
    <div className="container">
      <h1 className="display-3 text-center fw-bold">Add Contact</h1>
      <div className="row">
        <div className="col-md-6 shadow mx-auto p-5">
          <form className="text-center" onSubmit={handleAddContact}>
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
                type="text"
                placeholder="Phone Number"
                className="form-control"
                value={phone}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="submit"
                value="Add Contact"
                className="btn btn-block btn-dark"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
