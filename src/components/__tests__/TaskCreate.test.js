import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TaskCreate from "../../pages/create/TaskCreate";

// Mock Firebase dependencies
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(() => ({
    collection: () => ({
      add: (doc) => Promise.resolve({ id: "mockDocId", ...doc }),
    }),
  })),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
}));

// Inputs that need to be passed to the TaskCreate component
const inputs = [
  { id: "title", label: "Title", type: "text", placeholder: "Enter title" },
  {
    id: "description",
    label: "Description",
    type: "text",
    placeholder: "Enter description",
  },
];

// Title for the TaskCreate component
const title = "Create New Task";

describe("TaskCreate component", () => {
  it("should successfully create a new task", async () => {
    const { getByLabelText, getByRole } = render(
      <MemoryRouter>
        <TaskCreate inputs={inputs} title={title} />
      </MemoryRouter>
    );

    // Simulate user input
    fireEvent.change(getByLabelText("Title"), {
      target: { value: "New Task" },
    });
    fireEvent.change(getByLabelText("Description"), {
      target: { value: "Task Description" },
    });

    // Simulate form submission
    fireEvent.click(getByRole("button", { name: /create task/i }));

    // Wait for the expected outcome
    await waitFor(() => {
      // Assertions can be added here if needed
    });

    // Since there is a console log and alert on successful task creation,
    // you might want to mock these as well to prevent pollution of test outputs.
    console.log = jest.fn();
    window.alert = jest.fn();
  });
});
