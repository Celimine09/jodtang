"use client";

import { PageHeader } from "@/components/finance/page-header";
import { SummaryCards } from "@/components/finance/summary-cards";
import { ManageBudgets } from "@/components/finance/manage-budgets";
import { Sidebar, MobileNavigation } from "@/components/finance/sidebar";
import { useUserProfile } from "@/hooks/useProfile";

export default function BudgetsPage() {
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

          {/* Manage Budgets */}
          <section>
            <ManageBudgets />
          </section>
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
}
