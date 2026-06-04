import { DashboardHeader } from "@/components/finance/dashboard-header";
import { SummaryCards } from "@/components/finance/summary-cards";
import { BudgetChart } from "@/components/finance/budget-chart";
import { RecentTransactions } from "@/components/finance/recent-transactions";
import { AddTransactionButton } from "@/components/finance/add-transaction-button";

export default function FinanceDashboard() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-6 md:px-6 md:py-8 pb-24 sm:pb-8">
        <DashboardHeader />

        {/* Summary Cards */}
        <section className="mb-6">
          <SummaryCards />
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Budget Chart */}
          <section>
            <BudgetChart />
          </section>

          {/* Recent Transactions */}
          <section>
            <RecentTransactions />
          </section>
        </div>

        {/* Mobile Floating Button */}
        <div className="sm:hidden">
          <AddTransactionButton />
        </div>
      </div>
    </main>
  );
}
