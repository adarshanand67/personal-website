import { render, screen, waitFor } from "@testing-library/react";
import AnimeShelf from "../app/animeshelf/page";
import "@testing-library/jest-dom";

// Mock the API call
jest.mock("../lib/api", () => ({
  getEntertainment: jest.fn().mockResolvedValue([
    {
      title: "Test Anime Watched",
      type: "Anime",
      status: "Completed",
      notes: "Note 1",
    },
    {
      title: "Test Anime Planned",
      type: "Anime",
      status: "Plan to Watch",
      notes: "Note 2",
    },
    {
      title: "Test Movie Watched",
      type: "Movie",
      status: "Completed",
      notes: "Note 3",
    },
    {
      title: "Test Movie Planned",
      type: "Movie",
      status: "Plan to Watch",
      notes: "Note 4",
    },
  ]),
}));

describe("AnimeShelf Page", () => {
  it("renders anime and movie sections", async () => {
    const component = await AnimeShelf();
    render(component);

    expect(screen.getByText("Anime Shelf")).toBeInTheDocument();
    expect(screen.getByText("Anime")).toBeInTheDocument();
    expect(screen.getByText("Movies")).toBeInTheDocument();
  });

  it("segregates watched and planned anime", async () => {
    const component = await AnimeShelf();
    render(component);

    // Check for section headers
    expect(screen.getAllByText("Watched").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Plan to Watch").length).toBeGreaterThan(0);

    // Check for specific items
    expect(screen.getByText("Test Anime Watched")).toBeInTheDocument();
    expect(screen.getByText("Test Anime Planned")).toBeInTheDocument();
  });

  it("segregates watched and planned movies", async () => {
    const component = await AnimeShelf();
    render(component);

    expect(screen.getByText("Test Movie Watched")).toBeInTheDocument();
    expect(screen.getByText("Test Movie Planned")).toBeInTheDocument();
  });

  it("displays notes when present", async () => {
    const component = await AnimeShelf();
    render(component);

    expect(screen.getByText("Note 1")).toBeInTheDocument();
  });
});
