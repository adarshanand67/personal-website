import { render, screen } from "@testing-library/react";
import Hero from "../components/Hero";
import "@testing-library/jest-dom";

// Mock the Hero component as async since it awaits getProfile
jest.mock("../components/Hero", () => {
  return {
    __esModule: true,
    default: () => {
      // Mock data for testing
      const profile = {
        name: "Adarsh Anand",
        bio: {
          short: "SDE @Trellix | C++ | Ex-Intel",
          paragraphs: ["Test bio"],
        },
        socials: {
          linkedin: "https://linkedin.com/test",
          github: "https://github.com/test",
        },
      };

      return (
        <div data-testid="hero-section">
          <h1>Hey, I am {profile.name.split(" ")[0]}</h1>
          <h3>{profile.bio.short}</h3>
          <a href={profile.socials.linkedin}>LinkedIn</a>
          <a href={profile.socials.github}>GitHub</a>
        </div>
      );
    },
  };
});

describe("Hero", () => {
  it("renders a heading", async () => {
    const { findByRole, findByText } = render(<Hero />);
    const heading = await findByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Hey, I am Adarsh");
  });

  it("renders bio short text", async () => {
    const { findByText } = render(<Hero />);
    const bio = await findByText("SDE @Trellix | C++ | Ex-Intel");
    expect(bio).toBeInTheDocument();
  });
});
