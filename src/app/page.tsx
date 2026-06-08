"use client";

import { PageHeader } from "@/components/finance/page-header";
import { SummaryCards } from "@/components/finance/summary-cards";
import { BudgetChart } from "@/components/finance/budget-chart";
import { RecentTransactions } from "@/components/finance/recent-transactions";
import { Sidebar, MobileNavigation } from "@/components/finance/sidebar";
import { useBudgets } from "@/hooks/useBudget";
import { useTransactions } from "@/hooks/useTransaction";
import { useUserProfile } from "@/hooks/useProfile";

export default function FinanceDashboard() {
  const { data: response, isLoading, error } = useBudgets();
  const { data: transactionResponse, isLoading: isLoadingTx } =
    useTransactions();
  const budgetDataArray = response || [];
  const transactionDataArray = transactionResponse || [];

  if (isLoading) return <div>Generating chart...</div>;
  if (error) return <div>An error occurred while loading data</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="md:pl-52">
        <div className="max-w-6xl mx-auto px-4 py-6 md:px-6 md:py-8 pb-24 md:pb-8">
          <PageHeader />

          {/* Summary Cards */}
          <section className="mb-6">
            <SummaryCards />
          </section>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Budget Chart */}
            <section>
              <BudgetChart budgets={budgetDataArray} />
            </section>

            {/* Recent Transactions */}
            <section>
              <RecentTransactions transactions={transactionDataArray} />
            </section>
          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
}
