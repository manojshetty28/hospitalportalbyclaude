import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import ErrorPage from "@/app/error";
import RootLayout, { metadata as rootMetadata } from "@/app/layout";
import NotFoundPage from "@/app/not-found";
import HomePage from "@/app/page";
import InpatientsPage, {
  metadata as inpatientsMetadata,
} from "@/app/patients/page";

vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "font-inter-variable" }),
}));
vi.mock("@/components/HomeContent", () => ({
  HomeContent: () => <p>home content</p>,
}));
vi.mock("@/components/InpatientsContent", () => ({
  InpatientsContent: () => <p>in-patients content</p>,
}));

describe("RootLayout", () => {
  it("wraps the page in an English document with the app font", () => {
    const html = renderToStaticMarkup(
      <RootLayout>
        <p>page body</p>
      </RootLayout>,
    );

    expect(html).toContain('<html lang="en"');
    expect(html).toContain("font-inter-variable");
    expect(html).toContain("<p>page body</p>");
  });

  it("sets the default page title", () => {
    expect(rootMetadata.title).toEqual({
      default: "Hospital Portal",
      template: "%s | Hospital Portal",
    });
  });
});

describe("HomePage", () => {
  it("renders the home content", () => {
    render(<HomePage />);

    expect(screen.getByText("home content")).toBeVisible();
  });
});

describe("InpatientsPage", () => {
  it("renders the in-patients content", () => {
    render(<InpatientsPage />);

    expect(screen.getByText("in-patients content")).toBeVisible();
    expect(inpatientsMetadata.title).toBe("In-patients");
  });
});

describe("ErrorPage", () => {
  it("shows the load error, logs it and retries on request", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const error = new Error("database unavailable");
    const retry = vi.fn();

    render(<ErrorPage error={error} retry={retry} />);

    expect(
      screen.getByRole("heading", {
        name: "Unable to load data. Please try again.",
      }),
    ).toBeVisible();
    expect(consoleError).toHaveBeenCalledWith(error);

    await userEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(retry).toHaveBeenCalledTimes(1);
  });
});

describe("NotFoundPage", () => {
  it("shows a message and a link home", () => {
    render(<NotFoundPage />);

    expect(
      screen.getByRole("heading", { name: "Page not found" }),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: "Back to Home" })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
