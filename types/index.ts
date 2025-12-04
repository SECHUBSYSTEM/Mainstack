export interface Wallet {
  balance: number;
  total_payout: number;
  total_revenue: number;
  pending_payout: number;
  ledger_balance: number;
}

export interface Transaction {
  amount: number;
  metadata?: {
    name?: string;
    type?: string;
    product_name?: string;
    quantity?: number;
    country?: string;
  };
  payment_reference?: string;
  status: "successful" | "pending" | "failed";
  date: string;
  type: string;
}

export interface User {
  first_name: string;
  last_name: string;
  email: string;
}

export interface FilterState {
  dateRange: string;
  startDate?: Date;
  endDate?: Date;
  transactionType: string[];
  transactionStatus: string[];
}
