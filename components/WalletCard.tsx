interface WalletCardProps {
  balance?: number;
}

export function WalletCard({ balance = 0 }: WalletCardProps) {
  return (
    <div className="flex flex-col gap-20 md:flex-row md:items-center w-full">
      <div className="space-y-2">
        <p className="text-sm text-gray-500 font-medium">Available Balance</p>
        <h1 className="text-4xl font-bold tracking-tight">
          USD{" "}
          {balance.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h1>
      </div>
      <button className="bg-black text-white cursor-pointer px-10 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors w-full md:w-auto">
        Withdraw
      </button>
    </div>
  );
}
