import { useEffect, useState } from "react";

import { useLanguage, useTranslations } from "@/contexts/language-context";
import { API_ENDPOINTS, BANK_ACCOUNT_ID, STATEMENT_URL } from "@/config/api";
import { TransactionResponse } from "@/types/transaction";

const StatsSection = () => {
  const { stats, projects } = useTranslations();
  const { language } = useLanguage();
  // null = not loaded yet or the statement API failed: never show 0 in that case.
  const [spent, setSpent] = useState<number | null>(null);
  const [animated, setAnimated] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fetchedAt, setFetchedAt] = useState<Date | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const today = new Date();
        const yearAgo = new Date();
        yearAgo.setFullYear(today.getFullYear() - 1);
        const url = API_ENDPOINTS.BANK_TRANSACTIONS(BANK_ACCOUNT_ID, {
          fromDate: yearAgo.toISOString().split("T")[0],
          toDate: today.toISOString().split("T")[0],
          keyword: "",
          pageNumber: 1,
          pageSize: 1,
        });
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data: TransactionResponse = await response.json();
        if (data.status === 200 && typeof data.data?.totalDebit === "number" && data.data.totalDebit > 0) {
          setSpent(data.data.totalDebit);
          setFetchedAt(new Date());
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (spent === null) return;
    let current = 0;
    const step = spent / (1500 / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= spent) {
        setAnimated(spent);
        clearInterval(timer);
      } else {
        setAnimated(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [spent]);

  const locale = language === "vi" ? "vi-VN" : "en-US";

  return (
    <section className="bg-slate-100 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-2">
          <div>
            <p className="text-4xl font-bold text-primary md:text-5xl" aria-live="polite">
              {spent === null
                ? loading
                  ? "…"
                  : stats.unavailable
                : animated.toLocaleString(locale)}
            </p>
            <p className="mt-2 text-slate-600">{stats.raisedLabel}</p>
            <p className="mt-1 text-xs text-slate-500">
              <a
                href={STATEMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-slate-700"
              >
                {stats.source}
              </a>
              {fetchedAt && ` (${fetchedAt.toLocaleDateString(locale)})`}
            </p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary md:text-5xl">
              {projects.items.length}
            </p>
            <p className="mt-2 text-slate-600">
              <a href="#projects" className="underline-offset-4 hover:underline">
                {stats.projectsCompleted}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
