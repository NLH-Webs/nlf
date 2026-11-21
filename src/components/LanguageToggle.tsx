import { LANGUAGE_OPTIONS, useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

interface LanguageToggleProps {
  className?: string;
}

const LanguageToggle = ({ className }: LanguageToggleProps) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full border border-slate-300 bg-card px-2.5 py-1.5 text-sm text-slate-600 shadow-sm",
        "transition-colors duration-200",
        className,
      )}
      aria-label="Language selection"
    >
      <Globe strokeWidth={1.75} className="h-4 w-4 text-[color:var(--nlf-gold)]" aria-hidden="true" />
      <div className="flex items-center gap-1">
        {LANGUAGE_OPTIONS.map((option) => {
          const isActive = option.code === language;
          return (
            <button
              key={option.code}
              type="button"
              onClick={() => setLanguage(option.code)}
              aria-pressed={isActive}
              aria-label={option.fullLabel}
              className={cn(
                "rounded-full px-3 py-1 font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/70 focus-visible:ring-offset-2",
                isActive
                  ? "bg-slate-900 text-background shadow-sm"
                  : "text-slate-700 hover:text-slate-900",
              )}
            >
              <span className="md:hidden">{option.code.toUpperCase()}</span>
              <span className="hidden md:inline">{option.shortLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageToggle;
