import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";

test("renders initial todos", () => {
  render(<TodoList />);
  expect(screen.getByText("Learn React")).toBeInTheDocument();
  expect(screen.getByText("Write Tests")).toBeInTheDocument();
});

test("adds a new todo", () => {
  render(<TodoList />);
  fireEvent.change(screen.getByPlaceholderText("Add new todo"), {
    target: { value: "New Todo" },
  });
  fireEvent.click(screen.getByText("Add"));
  expect(screen.getByText("New Todo")).toBeInTheDocument();
});

test("toggles a todo", () => {
  render(<TodoList />);
  const todo = screen.getByText("Learn React");
  fireEvent.click(todo);
  expect(todo).toHaveStyle("text-decoration: line-through");
});

test("deletes a todo", () => {
  render(<TodoList />);
  const deleteBtn = screen.getAllByText("Delete")[0];
  fireEvent.click(deleteBtn);
  expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
});
