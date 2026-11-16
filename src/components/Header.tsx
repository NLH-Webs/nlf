import { useEffect, useMemo, useState } from "react";

import { useTranslations } from "@/contexts/language-context";
import LanguageToggle from "@/components/LanguageToggle";
import { Menu, X } from "lucide-react";

const SECTION_IDS = ["projects", "transparency", "contact"] as const;

const Header = () => {
  const { nav } = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  const sections = useMemo(
    () => [
      { id: "projects", label: nav.projects },
      { id: "transparency", label: nav.transparency },
      { id: "contact", label: nav.contact },
    ],
    [nav.projects, nav.transparency, nav.contact],
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const sectionId of SECTION_IDS) {
        const element = document.getElementById(sectionId);
        if (!element) {
          continue;
        }

        const offsetTop = element.offsetTop;
        const height = element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-background/90 backdrop-blur-custom">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-6">
        <div className="text-2xl font-bold text-slate-900">
          <button type="button" onClick={() => scrollToSection("hero")} aria-label="NhiLe Foundation">
            <img src="/nlf-logo.png" alt="NhiLe Foundation" className="h-10 w-auto md:h-12" width="500" height="184" />
          </button>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollToSection(id)}
              aria-current={activeSection === id ? "page" : undefined}
              className={`border-b-2 px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                activeSection === id
                  ? "border-[color:var(--nlf-gold)] text-slate-900"
                  : "border-transparent text-slate-700 hover:text-slate-900"
              }`}
            >
              {label}
            </button>
          ))}
          <a
            href="https://nlh.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 text-sm text-slate-700 transition-colors duration-200 hover:text-slate-900"
          >
            {nav.holdings}
          </a>
          <LanguageToggle className="ml-2" />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="p-2 text-slate-900"
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="animate-in slide-in-from-top-2 space-y-2 bg-background/95 px-6 pb-4 pt-2 backdrop-blur-sm duration-200 md:hidden">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollToSection(id)}
              aria-current={activeSection === id ? "page" : undefined}
              className={`block w-full rounded-md px-3 py-2 text-left transition-colors ${
                activeSection === id
                  ? "bg-slate-100 font-medium text-slate-900"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {label}
            </button>
          ))}
          <a
            href="https://nlh.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-md px-3 py-2 text-left text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            {nav.holdings}
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
