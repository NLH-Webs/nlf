import { useTranslations } from "@/contexts/language-context";
import { NLH_URL, STATEMENT_URL, mailto } from "@/config/api";

const Footer = () => {
  const { footer, nav, contact } = useTranslations();

  return (
    <footer className="bg-[color:var(--nlf-footer-bg)] py-10 text-[color:var(--nlf-cream)]">
      <div className="container mx-auto flex flex-col gap-6 px-4 md:flex-row md:items-end md:justify-between md:px-6">
        <div>
          <p className="font-display text-xl font-bold">NhiLe Foundation</p>
          <p className="mt-1 text-sm">{footer.tagline}</p>
          <p className="mt-4 text-xs opacity-80">{footer.copyright}</p>
        </div>
        <ul className="flex flex-col text-sm md:items-end">
          <li>
            <a href={STATEMENT_URL} data-track="cta" data-cta="footer_statement" target="_blank" rel="noopener noreferrer" className="inline-block py-2.5 underline decoration-[color:var(--nlf-gold-light)] underline-offset-4">
              {contact.statementLink}
            </a>
          </li>
          <li>
            <a href={NLH_URL} data-track="ecosystem" data-cta="footer_nlh" target="_blank" rel="noopener noreferrer" className="inline-block py-2.5 underline decoration-[color:var(--nlf-gold-light)] underline-offset-4">
              {nav.holdings}
            </a>
          </li>
          <li>
            <a href={mailto("footer_email")} data-track="contact" data-cta="footer_email" className="inline-block py-2.5 underline decoration-[color:var(--nlf-gold-light)] underline-offset-4">
              nhilefoundation.sg@gmail.com
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
