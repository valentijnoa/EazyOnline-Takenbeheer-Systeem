import React, { useEffect, useState } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatableSource";
import { Link } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { auth } from "../../firebase";

const Datatable = () => {
  const [data, setData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Function to fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
    };
    fetchData();

    // Check if the current user is admin
    const currentUser = auth.currentUser;
    if (currentUser && currentUser.email === "admin@eazy.nl") {
      setIsAdmin(true);
    }
  }, []);

  // Function to handle the deletion of a user
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log("Error deleting document: ", error);
    }
  };

  // Actions column configuration for the DataGrid
  const actions = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/users/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            {isAdmin && (
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row.id)}
              >
                Delete
              </div>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Users
        {isAdmin && (
          <Link
            to="/users/create"
            style={{ textDecoration: "none" }}
            className="createLink"
          >
            Add New User
          </Link>
        )}
      </div>
      <DataGrid
        rows={data}
        columns={userColumns.concat(actions)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 9 },
          },
        }}
        pageSizeOptions={[9, 9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
