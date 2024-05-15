import React, { useState } from "react";
import "./create.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

const TaskCreate = ({ inputs, title }) => {
  const [data, setData] = useState({});

  // Function to handle input changes and update the form data state
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    // Update the form data state
    setData({ ...data, [id]: value });
  };

  // Function to handle the creation of a new task
  const handleNewTask = async (e) => {
    e.preventDefault();
    try {
      // Add a new document "tasks" collection in firestore
      await addDoc(collection(db, "tasks"), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      console.log("Task created successfully!");
      alert("Task created successfully!");

      // Go back to the previous page
      window.history.back();
    } catch (error) {
      console.error("Error creating task:", error);
      alert(`Error creating task: ${error.message}`);
    }
  };

  return (
    <div className="create">
      <Sidebar />
      <div className="createContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleNewTask}>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleInput}
                  />
                </div>
              ))}
              <button type="submit">Create Task</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCreate;
