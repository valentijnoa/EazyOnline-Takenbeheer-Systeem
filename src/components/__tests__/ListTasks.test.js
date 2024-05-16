import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { Router, Route, MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import TaskDatatable from "../../components/datatable/TaskDatatable";
import "@testing-library/jest-dom";
import ListTasks from "../../pages/list/ListTasks";

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn().mockReturnValue({
    collection: jest.fn(() => ({
      doc: jest.fn(),
      getDocs: jest.fn(() =>
        Promise.resolve({
          forEach: (callback) => {
            [
              {
                id: "1",
                Title: "Integration Test",
                Description: "Complete writing tests for DataTable",
                Category: "Testing",
                User: "Jeff",
              },
              {
                id: "2",
                Title: "boodschappen",
                Description: "eten kopen",
                Category: "Personal",
                User: "Alex",
              },
            ].forEach((doc) => callback({ id: doc.id, data: () => doc }));
          },
        })
      ),
    })),
  }),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: {
      email: "admin@eazy.nl",
    },
  })),
}));

describe("Displaying Tasks in TaskDatatable", () => {
  it("renders tasks fetched from Firestore", async () => {
    render(
      <MemoryRouter>
        <TaskDatatable />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/boodschappen/)).toBeInTheDocument();
    });
  });
});

describe("Navigation on View button click", () => {
  it("navigates to the task detail view", async () => {
    const history = createMemoryHistory();
    render(
      <MemoryRouter history={history}>
        <ListTasks />
      </MemoryRouter>
    );

    const viewButton = await screen.findByText("View");
    fireEvent.click(viewButton);

    // Check that the URL has changed to expected task detail URL
    expect(history.location.pathname).toBe("/tasks/task");
  });
});
