import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import Navbar from "./components/Navbar";

const App = () => {
  // State to hold the list of contacts
  const [contacts, setContacts] = useState([]);

  // Function to fetch contacts from the API
  useEffect(() => {
    fetchContacts();
  }, []);

  
  // Function to fetch contacts from the API
  const fetchContacts = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    //console.log(data);
    setContacts(data);
  };

  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Home contacts={contacts} setContacts={setContacts} />}
          />
          <Route
            path="/add"
            element={
              <AddContact contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route
            path="/edit/:id"
            element={
              <EditContact contacts={contacts} setContacts={setContacts} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
