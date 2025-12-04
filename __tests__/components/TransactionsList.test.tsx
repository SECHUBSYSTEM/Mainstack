import { render, screen, fireEvent } from "@testing-library/react";
import { TransactionsList } from "@/components/TransactionsList";
import { Transaction } from "@/types";

const mockTransactions: Transaction[] = [
  {
    amount: 1000,
    metadata: {
      name: "John Doe",
      type: "digital_product",
      product_name: "E-book",
    },
    status: "successful",
    date: "2024-01-15T10:00:00Z",
    type: "deposit",
  },
  {
    amount: 500,
    metadata: {
      name: "Jane Smith",
    },
    status: "pending",
    date: "2024-01-14T15:30:00Z",
    type: "withdrawal",
  },
];

describe("TransactionsList", () => {
  const mockFilterClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should display loading state when fetching transactions", () => {
    render(
      <TransactionsList
        transactions={[]}
        isLoading={true}
        onFilterClick={mockFilterClick}
        filterCount={0}
        dateRangeLabel="all time"
      />
    );
    expect(screen.getByText(/loading transactions/i)).toBeInTheDocument();
  });

  it("should render transactions with correct data and formatting", () => {
    render(
      <TransactionsList
        transactions={mockTransactions}
        onFilterClick={mockFilterClick}
        filterCount={0}
        dateRangeLabel="all time"
      />
    );

    expect(screen.getByText("2 Transactions")).toBeInTheDocument();
    expect(screen.getByText("E-book")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText(/USD 1,000/)).toBeInTheDocument();
    expect(screen.getByText(/Jan 15, 2024/)).toBeInTheDocument();
  });

  it("should handle filter interactions correctly", () => {
    render(
      <TransactionsList
        transactions={mockTransactions}
        onFilterClick={mockFilterClick}
        filterCount={3}
        dateRangeLabel="all time"
      />
    );

    const filterButton = screen.getByRole("button", { name: /filter/i });
    expect(screen.getByText("3")).toBeInTheDocument(); // Filter badge count
    fireEvent.click(filterButton);
    expect(mockFilterClick).toHaveBeenCalledTimes(1);
  });

  it("should show empty state when no transactions match filters", () => {
    render(
      <TransactionsList
        transactions={[]}
        onFilterClick={mockFilterClick}
        filterCount={1}
        dateRangeLabel="all time"
      />
    );

    expect(
      screen.getByText(/no matching transaction found/i)
    ).toBeInTheDocument();
    const clearButton = screen.getByRole("button", { name: /clear filter/i });
    fireEvent.click(clearButton);
    expect(mockFilterClick).toHaveBeenCalled();
  });
});
