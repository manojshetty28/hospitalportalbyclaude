import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HospitalCard } from "@/components/HospitalCard";
import { HospitalLogo } from "@/components/HospitalLogo";
import { Icon } from "@/components/Icon";
import { InfoTile } from "@/components/InfoTile";
import { InpatientsTable } from "@/components/InpatientsTable";
import { PageSkeleton } from "@/components/PageSkeleton";
import { StatusMessage } from "@/components/StatusMessage";
import { TopBar } from "@/components/TopBar";
import { sampleHospital, sampleInpatients } from "@/test-data";

describe("HospitalLogo", () => {
  it("is an image with an accessible name at the given size", () => {
    render(<HospitalLogo size={72} onDark={false} />);

    const logo = screen.getByRole("img", { name: "Hospital logo" });
    expect(logo).toHaveAttribute("width", "72");
    expect(logo.querySelector("path")).toHaveAttribute("fill", "#2f8996");
  });

  it("uses a white shield on dark backgrounds", () => {
    render(<HospitalLogo size={36} onDark />);

    const logo = screen.getByRole("img", { name: "Hospital logo" });
    expect(logo.querySelector("path")).toHaveAttribute("fill", "#ffffff");
  });
});

describe("Icon", () => {
  it("renders a decorative icon", () => {
    const { container } = render(<Icon name="bed" className="size-5" />);

    const icon = container.querySelector("svg");
    expect(icon).toHaveAttribute("aria-hidden", "true");
    expect(icon).toHaveAttribute("data-icon", "bed");
  });
});

describe("TopBar", () => {
  it("shows the logo and the title", () => {
    render(<TopBar title="City Care Hospital" />);

    const banner = screen.getByRole("banner");
    expect(
      within(banner).getByRole("img", { name: "Hospital logo" }),
    ).toBeVisible();
    expect(within(banner).getByText("City Care Hospital")).toBeVisible();
  });
});

describe("InfoTile", () => {
  it("shows the label and value", () => {
    render(
      <InfoTile
        label="Owner of hospital"
        value="Dr. Anita Rao"
        icon="user"
        tone="steel"
        emphasis={false}
      />,
    );

    expect(screen.getByText("Owner of hospital")).toBeVisible();
    expect(screen.getByText("Dr. Anita Rao")).toHaveClass("text-[17px]");
  });

  it("shows an emphasised value in a larger size", () => {
    render(
      <InfoTile
        label="Number of in-patients"
        value="6"
        icon="bed"
        tone="slate"
        emphasis
      />,
    );

    expect(screen.getByText("6")).toHaveClass("text-3xl");
  });
});

describe("HospitalCard", () => {
  it("shows the four hospital values and the Patients Info link", () => {
    render(<HospitalCard hospital={sampleHospital} />);

    expect(
      screen.getByRole("heading", { level: 1, name: "City Care Hospital" }),
    ).toBeVisible();
    expect(screen.getByText("Hospital name")).toBeVisible();
    expect(
      screen.getByText("12 Lake View Road, Bengaluru 560001"),
    ).toBeVisible();
    expect(screen.getByText("Dr. Anita Rao")).toBeVisible();
    expect(screen.getByText("Number of in-patients")).toBeVisible();
    expect(screen.getByText("2")).toBeVisible();
    expect(screen.getByRole("link", { name: "Patients Info" })).toHaveAttribute(
      "href",
      "/patients",
    );
  });
});

describe("InpatientsTable", () => {
  it("shows one row per in-patient with formatted values", () => {
    render(<InpatientsTable inpatients={sampleInpatients} />);

    expect(
      screen.getAllByRole("columnheader").map((header) => header.textContent),
    ).toEqual([
      "Patient name",
      "Patient card number",
      "Admission date",
      "Current bill amount",
      "Disease name",
    ]);

    const rows = screen.getAllByRole("row").slice(1);
    expect(rows).toHaveLength(2);
    expect(within(rows[0]).getByText("Ravi Kumar")).toBeVisible();
    expect(within(rows[0]).getByText("RK")).toBeInTheDocument();
    expect(within(rows[0]).getByText("PC-1001")).toBeVisible();
    expect(within(rows[0]).getByText("16 Nov 2026")).toBeVisible();
    expect(within(rows[0]).getByText("42,500.00")).toBeVisible();
    expect(within(rows[0]).getByText("Pneumonia")).toBeVisible();
    expect(within(rows[1]).getByText("1,24,300.00")).toBeVisible();
  });

  it("shows a message when there are no in-patients", () => {
    render(<InpatientsTable inpatients={[]} />);

    expect(screen.getByText("No in-patients found")).toBeVisible();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });
});

describe("PageSkeleton", () => {
  it("announces that the page is loading", () => {
    render(<PageSkeleton />);

    expect(screen.getByRole("status", { name: "Loading" })).toBeVisible();
    expect(screen.getByText("Hospital Portal")).toBeVisible();
  });
});

describe("StatusMessage", () => {
  it("shows the message and its actions", () => {
    render(
      <StatusMessage message="Page not found">
        <button type="button">Try again</button>
      </StatusMessage>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Page not found" }),
    ).toBeVisible();
    expect(screen.getByRole("button", { name: "Try again" })).toBeVisible();
  });
});
