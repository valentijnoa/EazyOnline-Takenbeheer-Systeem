import React, { useEffect, useState } from "react";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Single = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleEdit = () => {
    setEditMode(true);
    // Initialize updatedData with current user data
    setUpdatedData(userData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the state with the edited data
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "users", userId);
      await updateDoc(docRef, updatedData);
      setUserData(updatedData); // Update userData state with edited data
      setEditMode(false); // Exit edit mode
      console.log("User data updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleCancel = () => {
    setEditMode(false); // Exit edit mode without submitting changes
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="userInfo">
          {editMode ? (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="fullName"
                value={updatedData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
              />
              <input
                type="text"
                name="email"
                value={updatedData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <input
                type="text"
                name="phone"
                value={updatedData.phone}
                onChange={handleChange}
                placeholder="Phone"
              />
              <input
                type="text"
                name="address"
                value={updatedData.address}
                onChange={handleChange}
                placeholder="Address"
              />
              <button type="submit">Submit</button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </form>
          ) : userData ? (
            <div className="item">
              <img
                className="itemImg"
                src={userData.profilePic}
                alt="Profile"
              />
              <div>
                <h1>{userData.fullName}</h1>
                <div>
                  <span>Email:</span>
                  <span>{userData.email}</span>
                </div>
                <div>
                  <span>Phone:</span>
                  <span>{userData.phone}</span>
                </div>
                <div>
                  <span>Address:</span>
                  <span>{userData.address}</span>
                </div>
              </div>
              <div className="edit" onClick={handleEdit}>
                Edit
              </div>
            </div>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Single;
