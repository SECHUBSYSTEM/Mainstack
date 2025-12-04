import { render, screen } from "@testing-library/react";
import { SideStats } from "@/components/SideStats";

describe("SideStats", () => {
  it("should render all financial stats with correct formatting", () => {
    render(
      <SideStats
        ledgerBalance={1234.56}
        totalPayout={2000}
        totalRevenue={3000}
        pendingPayout={500}
      />
    );

    expect(screen.getByText("Ledger Balance")).toBeInTheDocument();
    expect(screen.getByText("Total Payout")).toBeInTheDocument();
    expect(screen.getByText("Total Revenue")).toBeInTheDocument();
    expect(screen.getByText("Pending Payout")).toBeInTheDocument();
    expect(screen.getByText(/USD 1,234.56/)).toBeInTheDocument();
  });
});
