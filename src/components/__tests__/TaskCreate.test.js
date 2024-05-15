import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TaskCreate from "../../pages/create/TaskCreate";
import "@testing-library/jest-dom";

// Mock Firebase
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

// Define the inputs for the form
const inputs = [
  { id: "title", label: "Title", type: "text", placeholder: "Enter title" },
  {
    id: "description",
    label: "Description",
    type: "text",
    placeholder: "Enter description",
  },
];

// Title for the component
const title = "Create New Task";

// testing the TaskCreate component for creating new task
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

    console.log = jest.fn();
    window.alert = jest.fn();
  });

  // Check if the form elements are correctly initialized
  describe("Initial State of Form Elements", () => {
    it("should render all inputs with correct placeholders and types", () => {
      const { getByPlaceholderText } = render(
        <MemoryRouter>
          <TaskCreate inputs={inputs} title={title} />
        </MemoryRouter>
      );

      // Check if the inputs are rendered with correct placeholders and types
      inputs.forEach((input) => {
        const inputElement = getByPlaceholderText(input.placeholder);
        expect(inputElement).toBeInTheDocument();
        expect(inputElement.type).toBe(input.type);
      });
    });
  });
});
