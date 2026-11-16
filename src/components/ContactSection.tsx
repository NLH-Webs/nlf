import { useLanguage, useTranslations } from "@/contexts/language-context";
import { DONATE_URL, STATEMENT_URL, mailto } from "@/config/api";

// One job here: leave a message (three boxes). Donating is a plain link, not a second button.
const ContactSection = () => {
  const { contact } = useTranslations();
  const { language } = useLanguage();

  return (
    <section id="contact" className="bg-secondary py-14 md:py-20">
      <span id="gop-suc" aria-hidden="true" />
      <span id="lien-he" aria-hidden="true" />
      <div className="container mx-auto grid gap-8 px-4 md:grid-cols-[1fr_1.2fr] md:gap-12 md:px-6">
        <div>
          <span className="nlf-gold-rule mb-4" aria-hidden="true" />
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-4xl">{contact.heading}</h2>
          <p className="mt-3 max-w-md text-slate-700">{contact.body}</p>
          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <a href={DONATE_URL} data-track="cta" data-cta="contact_donate" target="_blank" rel="noopener noreferrer" className="nlf-link font-medium">
                {contact.donateLink}
              </a>
            </li>
            <li>
              <a href={STATEMENT_URL} data-track="cta" data-cta="contact_statement" target="_blank" rel="noopener noreferrer" className="nlf-link">
                {contact.statementLink}
              </a>
            </li>
            <li className="text-slate-700">
              {contact.emailLabel}{" "}
              <a href={mailto("Góp sức - email")} data-track="contact" data-cta="contact_email" className="nlf-link break-all">
                nhilefoundation.sg@gmail.com
              </a>
            </li>
          </ul>
        </div>
        <div className="nlh-lead-card">
          <nlh-contact
            site="nlf"
            lang={language}
            compact=""
            no-heading=""
            topics-vi="Góp sức cho quỹ|Ủng hộ – quyên góp|Hợp tác tổ chức|Giới thiệu hoàn cảnh cần hỗ trợ"
            topics-en="Help the fund|Donation|Organisational partnership|Refer someone who needs support"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
