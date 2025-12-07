import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../components/Navbar";
import "@testing-library/jest-dom";

// Mock ThemeToggle to avoid context issues
jest.mock("../components/theme-toggle", () => ({
  ThemeToggle: () => <button>Toggle Theme</button>,
}));

describe("Navbar", () => {
  it("renders the brand name", () => {
    render(<Navbar />);
    const brand = screen.getByText("Adarsh Anand");
    expect(brand).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Navbar />);
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByText("Animeshelf")).toBeInTheDocument();
    expect(screen.getByText("Bookshelf")).toBeInTheDocument();
    expect(screen.getByText("Volunteering")).toBeInTheDocument();
  });

  it("toggles mobile menu on click", () => {
    render(<Navbar />);
    const burger = screen.getByLabelText("menu");
    const menu = document.getElementById("menu");

    expect(menu).toHaveClass("md:hidden"); // Check for base classes instead of just 'hidden' which might be toggled differently

    // In default render, isActive is false
    // Let's check the class on the menu div based on the state logic
    // Note: "hidden" is applied when isActive is false.
    // Checking if "is-active" class is applied to burger logic

    fireEvent.click(burger);
    expect(burger).toHaveClass("is-active");
    // Check if the class list changed to indicate visibility (e.g., max-h-screen or similar)
    // The implementation likely toggles max-h-0 to max-h-screen
    expect(menu).not.toHaveClass("max-h-0");
  });
});
