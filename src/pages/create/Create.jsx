import "./create.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

const Create = ({ inputs, title }) => {
  const [data, setData] = useState({});

  //handle input change
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  //create user in the database
  const handleNew = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });

      // Send password reset email
      await sendPasswordResetEmail(auth, data.email);
      console.log(
        "User created successfully and password reset email sent:",
        res.user
      );
      //show alert for succesful user creation
      alert("User created successfully!");

      //go back to the previous page
      window.history.back();
    } catch (err) {
      console.log(err);
      console.error("Error creating user: ", err);
      alert(`Error creating user: ${err.message}`);
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
            <form onSubmit={handleNew}>
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
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
