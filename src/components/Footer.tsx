import { useTranslations } from "@/contexts/language-context";
import { STATEMENT_URL } from "@/config/api";

const Footer = () => {
  const { footer, nav, contact } = useTranslations();

  return (
    <footer className="bg-[color:var(--nlf-ink)] py-10 text-[color:var(--nlf-cream)]">
      <div className="container mx-auto flex flex-col gap-6 px-4 md:flex-row md:items-end md:justify-between md:px-6">
        <div>
          <p className="font-display text-xl font-bold">NhiLe Foundation</p>
          <p className="mt-1 text-sm">{footer.tagline}</p>
          <p className="mt-4 text-xs opacity-80">{footer.copyright}</p>
        </div>
        <ul className="flex flex-col gap-2 text-sm md:items-end">
          <li>
            <a href={STATEMENT_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-[color:var(--nlf-gold-light)] underline-offset-4">
              {contact.statementLink}
            </a>
          </li>
          <li>
            <a href="https://nlh.vn" target="_blank" rel="noopener noreferrer" className="underline decoration-[color:var(--nlf-gold-light)] underline-offset-4">
              {nav.holdings}
            </a>
          </li>
          <li>
            <a href="mailto:nhilefoundation.sg@gmail.com" className="underline decoration-[color:var(--nlf-gold-light)] underline-offset-4">
              nhilefoundation.sg@gmail.com
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
