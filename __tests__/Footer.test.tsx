import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";
import "@testing-library/jest-dom";

describe("Footer", () => {
  it("renders footer sections", () => {
    render(<Footer />);
    expect(screen.getByText("Writings and Learnings")).toBeInTheDocument();
    expect(screen.getByText("Legal and Contact")).toBeInTheDocument();
    expect(screen.getByText("Everything Else")).toBeInTheDocument();
  });

  it("renders copyright text", () => {
    render(<Footer />);
    expect(screen.getByText("© Adarsh Anand, 2025")).toBeInTheDocument();
  });

  it("renders important links", () => {
    render(<Footer />);
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByText("Contact Me")).toBeInTheDocument();
  });
});
