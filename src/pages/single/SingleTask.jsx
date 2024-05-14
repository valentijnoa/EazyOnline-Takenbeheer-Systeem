import React, { useEffect, useState } from "react";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const SingleTask = () => {
  const { taskId } = useParams();
  const [taskData, setTaskData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const docRef = doc(db, "tasks", taskId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setTaskData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };

    fetchTaskData();
  }, [taskId]);

  const handleEdit = () => {
    setEditMode(true);
    setUpdatedData(taskData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "tasks", taskId);
      await updateDoc(docRef, updatedData);
      setTaskData(updatedData);
      setEditMode(false);
      console.log("Task data updated successfully!");
    } catch (error) {
      console.error("Error updating task data:", error);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="taskInfo">
          {editMode ? (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="Title"
                value={updatedData.Title || ""}
                onChange={handleChange}
                placeholder="Title"
              />
              <input
                type="text"
                name="Description"
                value={updatedData.Description || ""}
                onChange={handleChange}
                placeholder="Description"
              />
              <input
                type="text"
                name="Category"
                value={updatedData.Category || ""}
                onChange={handleChange}
                placeholder="Category"
              />
              <input
                type="text"
                name="User"
                value={updatedData.User || ""}
                onChange={handleChange}
                placeholder="User"
              />
              <button type="submit">Submit</button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </form>
          ) : taskData ? (
            <div className="item">
              <div>
                <h1>{taskData.Title}</h1>
                <div>
                  <span>Description:</span>
                  <span>{taskData.Description}</span>
                </div>
                <div>
                  <span>Category:</span>
                  <span>{taskData.Category}</span>
                </div>
                <div>
                  <span>User:</span>
                  <span>{taskData.User}</span>
                </div>
              </div>
              <div className="edit" onClick={handleEdit}>
                Edit
              </div>
            </div>
          ) : (
            <p>Loading task data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleTask;
