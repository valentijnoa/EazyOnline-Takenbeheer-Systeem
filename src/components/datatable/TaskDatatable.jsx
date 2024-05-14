import React, { useEffect, useState } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { taskColumns } from "../../datatableSource";
import { Link } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { auth } from "../../firebase";

const TaskDatatable = () => {
  const [data, setData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
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

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log("Error deleting document: ", error);
    }
  };

  const actions = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/tasks/${params.row.id}`}
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
        Tasks
        {isAdmin && (
          <Link
            to="/tasks/create"
            style={{ textDecoration: "none" }}
            className="createLink"
          >
            Add New Task
          </Link>
        )}
      </div>
      <DataGrid
        rows={data}
        columns={taskColumns.concat(actions)}
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

export default TaskDatatable;
