import { useEffect, useState } from "react";

import handsGift from "@/assets/hands-gift.jpg";
import { useLanguage, useTranslations } from "@/contexts/language-context";
import { API_ENDPOINTS, BANK_ACCOUNT_ID, STATEMENT_URL } from "@/config/api";
import { TransactionResponse } from "@/types/transaction";

// Z pattern: logo (top-left) -> nav (top-right) -> headline (left) -> photo (right)
// -> proof number -> the one primary button. Red is used for that button only.
const HeroSection = () => {
  const { hero } = useTranslations();
  const { language } = useLanguage();
  // null = still loading, or the statement API failed: never show 0.
  const [spent, setSpent] = useState<number | null>(null);
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

  const locale = language === "vi" ? "vi-VN" : "en-US";

  return (
    <section id="hero" className="bg-background">
      <div className="container mx-auto grid items-center gap-8 px-4 py-6 md:grid-cols-2 md:gap-12 md:px-6 md:py-20">
        <div>
          <p className="mb-2 text-xs font-medium text-slate-700 md:mb-3 md:text-sm">{hero.eyebrow}</p>
          <span className="nlf-gold-rule mb-4 md:mb-5" aria-hidden="true" />
          <h1 className="font-display text-[1.75rem] font-bold leading-[1.18] text-slate-900 md:text-5xl">
            {hero.title}
          </h1>
          <p className="mt-3 max-w-xl text-base text-slate-700 md:mt-4 md:text-lg">{hero.subtitle}</p>

          <div className="mt-5 border-l-4 border-[color:var(--nlf-gold)] pl-4">
            <p className="text-2xl font-bold text-slate-900 md:text-4xl" aria-live="polite">
              {spent === null ? (loading ? "…" : hero.unavailable) : spent.toLocaleString(locale)}
            </p>
            <p className="text-sm text-slate-700">{hero.spentLabel}</p>
            <p className="mt-1 text-xs text-slate-600">
              {hero.spentSource}
              {fetchedAt && ` (${fetchedAt.toLocaleDateString(locale)})`}
            </p>
          </div>

          <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href={STATEMENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground shadow-md transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            >
              {hero.cta}
            </a>
            <a href="#gop-suc" className="nlf-link text-sm font-medium">
              {hero.secondary}
            </a>
          </div>

          <p className="mt-6 text-sm text-slate-700">
            <a
              href="https://www.facebook.com/nlf.sg/reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="nlf-link"
            >
              {hero.reviews}
            </a>
          </p>
        </div>

        <figure>
          <img
            src={handsGift}
            alt={hero.imageAlt}
            width={1056}
            height={496}
            className="aspect-[16/9] w-full rounded-2xl object-cover object-[30%_50%] shadow-lg md:aspect-[4/3]"
            fetchPriority="high"
          />
        </figure>
      </div>
    </section>
  );
};

export default HeroSection;
