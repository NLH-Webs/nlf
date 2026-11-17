import { useEffect, useState } from "react";
import { Gift, HandCoins, Landmark, ReceiptText, type LucideIcon } from "lucide-react";

import handsGift from "@/assets/hands-gift.webp";
import { useLanguage, useTranslations } from "@/contexts/language-context";
import { API_ENDPOINTS, BANK_ACCOUNT_ID, STATEMENT_URL } from "@/config/api";
import { prefersReducedMotion } from "@/hooks/use-reveal";
import { TransactionResponse } from "@/types/transaction";

// The money flow, one icon per step (Lucide, ISC licence; inline SVG, 1.75px stroke).
const FLOW_ICONS: LucideIcon[] = [HandCoins, Landmark, Gift, ReceiptText];

// Z pattern: logo -> nav -> headline -> photo -> the four-step picture -> proof number
// -> the one primary button. Crimson is used for that button only.
const HeroSection = () => {
  const { hero } = useTranslations();
  const { language } = useLanguage();
  // null = still loading, or the statement API failed: never show 0.
  const [spent, setSpent] = useState<number | null>(null);
  const [shown, setShown] = useState(0);
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

  // Count up to the real figure from the statement (about 0.9 s, eased); instant with reduced motion.
  useEffect(() => {
    if (spent === null) return;
    if (prefersReducedMotion()) {
      setShown(spent);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 900);
      setShown(Math.round(spent * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [spent]);

  const locale = language === "vi" ? "vi-VN" : "en-US";

  return (
    <section id="hero" className="bg-background">
      <div className="container mx-auto grid items-center gap-8 px-4 py-6 md:grid-cols-2 md:gap-12 md:px-6 md:py-16">
        <div>
          <p className="mb-2 text-base font-medium text-slate-700 md:mb-3">{hero.eyebrow}</p>
          <span className="nlf-gold-rule mb-4 md:mb-5" aria-hidden="true" />
          <h1 className="font-display text-[1.75rem] font-bold leading-[1.18] text-slate-900 md:text-5xl">
            {hero.title}
          </h1>
          <p className="mt-3 max-w-xl text-base text-slate-700 md:mt-4 md:text-lg">{hero.subtitle}</p>

          {/* One picture that says it all: where the money goes, in four steps. */}
          <div className="mt-5 md:mt-7">
            <h2 className="mb-3 text-base font-semibold text-slate-900">{hero.flowTitle}</h2>
            <ol className="nlf-flow relative grid grid-cols-4 gap-1 md:gap-3">
              <span className="nlf-flow-line" aria-hidden="true" />
              {hero.flow.map((step, i) => {
                const Icon = FLOW_ICONS[i];
                return (
                  <li
                    key={step.title}
                    className="nlf-flow-step relative flex flex-col items-center text-center"
                    style={{ animationDelay: `${i * 90}ms` }}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[color:var(--nlf-gold)] bg-[#F3E6C4] text-slate-900 md:h-14 md:w-14">
                      <Icon className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="mt-2 text-base font-semibold leading-tight text-slate-900">{step.title}</span>
                    <span className="mt-1 hidden text-sm text-slate-700 md:block">{step.detail}</span>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="mt-5 border-l-4 border-[color:var(--nlf-gold)] pl-4 md:mt-7">
            <p className="text-[1.75rem] font-bold leading-tight text-slate-900 md:text-4xl">
              <span aria-hidden="true">
                {spent === null ? (loading ? "…" : hero.unavailable) : shown.toLocaleString(locale)}
              </span>
              <span className="sr-only">
                {spent === null ? (loading ? "" : hero.unavailable) : spent.toLocaleString(locale)}
              </span>
            </p>
            <p className="text-base text-slate-700">{hero.spentLabel}</p>
            <p className="mt-1 text-base text-slate-700 md:text-sm">
              {hero.spentSource}
              {fetchedAt && ` (${fetchedAt.toLocaleDateString(locale)})`}
            </p>
          </div>

          <div className="mt-6 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-5">
            <a
              href={STATEMENT_URL}
              data-track="cta"
              data-cta="hero_statement"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center rounded-full bg-primary px-7 py-3 text-base font-semibold text-primary-foreground shadow-md transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            >
              {hero.cta}
            </a>
            <a
              href="#gop-suc"
              data-track="contact"
              data-cta="hero_leave_message"
              className="nlf-link inline-flex min-h-11 items-center text-base font-medium"
            >
              {hero.secondary}
            </a>
          </div>

          <p className="mt-3 text-base text-slate-700 md:text-sm">
            <a
              href="https://www.facebook.com/nlf.sg/reviews"
              data-track="cta"
              data-cta="hero_fb_reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="nlf-link inline-block py-2.5"
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
