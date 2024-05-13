import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home//Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import Create from "./pages/create/Create";
import { taskInputs, userInputs } from "./formSource";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="users">
              <Route index element={<List />}></Route>
              <Route path=":userId" element={<Single />}></Route>
              <Route
                path="create"
                element={<Create inputs={userInputs} title="Add new user" />}
              ></Route>
            </Route>
            <Route path="tasks">
              <Route index element={<List />}></Route>
              <Route path=":taskId" element={<Single />}></Route>
              <Route
                path="create"
                element={<Create inputs={taskInputs} title="Add new task" />}
              ></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
