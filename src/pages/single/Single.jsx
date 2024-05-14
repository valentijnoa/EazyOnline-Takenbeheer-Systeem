import React, { useEffect, useState } from "react";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Single = () => {
  const { userId } = useParams(); // Get the user ID from URL parameter
  const [userData, setUserData] = useState(null);

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
  }, [userId]); // Re-fetch data when userId changes

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="userInfo">
          <div className="edit">Edit</div>
          <h1 className="title">Information</h1>
          {userData ? (
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
