"use client";

import { PageHeader } from "@/components/finance/page-header";
import { SummaryCards } from "@/components/finance/summary-cards";
import { AllTransactionsTable } from "@/components/finance/all-transactions-table";
import { Sidebar, MobileNavigation } from "@/components/finance/sidebar";
import { useUserProfile } from "@/hooks/useProfile";
import { useTransactions } from "@/hooks/useTransaction";
import SubscriptionsPage from "@/components/finance/manage-subscription";

export default function SubscriptionPage() {
  const { data: transactions, isLoading, error } = useTransactions();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="md:pl-52">
        <div className="max-w-6xl mx-auto px-4 py-6 md:px-6 md:py-8 pb-24 md:pb-8">
          <PageHeader showAddButton={false} />

          {/* Summary Cards */}
          <section className="mb-6">
            <SummaryCards />
          </section>

          {/* All Transactions Table */}
          <section>
            <SubscriptionsPage />
          </section>
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
}
