import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home//Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import ListTasks from "./pages/list/ListTasks";
import Single from "./pages/single/Single";
import SingleTask from "./pages/single/SingleTask";
import Create from "./pages/create/Create";
import TaskCreate from "./pages/create/TaskCreate";
import { taskInputs, userInputs } from "./formSource";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />}></Route>
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            ></Route>
            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>
                }
              ></Route>
              <Route
                path=":userId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="create"
                element={
                  <RequireAuth>
                    <Create inputs={userInputs} title="Add new user" />
                  </RequireAuth>
                }
              ></Route>
            </Route>
            <Route path="tasks">
              <Route
                index
                element={
                  <RequireAuth>
                    <ListTasks />
                  </RequireAuth>
                }
              ></Route>
              <Route path=":taskId" element={<SingleTask />}></Route>
              <Route
                path="create"
                element={
                  <RequireAuth>
                    <TaskCreate inputs={taskInputs} title="Add new task" />
                  </RequireAuth>
                }
              ></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
