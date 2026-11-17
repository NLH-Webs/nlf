import { useEffect } from "react";
import { useLanguage, useTranslations } from "@/contexts/language-context";
import { DONATE_URL, STATEMENT_URL, mailto } from "@/config/api";

// One job here: leave a message (three boxes). Donating is a plain link, not a second button.
const ContactSection = () => {
  const { contact } = useTranslations();
  const { language } = useLanguage();

  // The shared form (nlh-contact) draws its buttons inside an open shadow root. Add nlf's
  // ink outline to its primary buttons (Gửi, and the next-step / email buttons) without
  // touching the shared file. adoptedStyleSheets survives the form re-rendering itself.
  useEffect(() => {
    let cancelled = false;
    customElements.whenDefined("nlh-contact").then(() => {
      const root = document.querySelector("nlh-contact")?.shadowRoot;
      if (cancelled || !root || !("adoptedStyleSheets" in root)) return;
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(
        ".primary{box-shadow:inset 0 0 0 1.5px #0D0D0D}",
      );
      if (!root.adoptedStyleSheets.some((s) => s.cssRules[0]?.cssText.includes("1.5px"))) {
        root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="contact" className="bg-secondary py-14 md:py-20">
      <span id="gop-suc" aria-hidden="true" />
      <span id="lien-he" aria-hidden="true" />
      <div className="container mx-auto grid gap-8 px-4 md:grid-cols-[1fr_1.2fr] md:gap-12 md:px-6">
        <div className="nlf-reveal">
          <span className="nlf-gold-rule mb-4" aria-hidden="true" />
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-4xl">{contact.heading}</h2>
          <p className="mt-3 max-w-md text-slate-700">{contact.body}</p>
          <ul className="mt-5 space-y-1 text-sm">
            <li>
              <a href={DONATE_URL} data-track="cta" data-cta="contact_donate" target="_blank" rel="noopener noreferrer" className="nlf-link inline-block py-2.5 font-medium">
                {contact.donateLink}
              </a>
            </li>
            <li>
              <a href={STATEMENT_URL} data-track="cta" data-cta="contact_statement" target="_blank" rel="noopener noreferrer" className="nlf-link inline-block py-2.5">
                {contact.statementLink}
              </a>
            </li>
            <li className="py-2.5 text-slate-700">
              {contact.emailLabel}{" "}
              <a href={mailto("contact_email")} data-track="contact" data-cta="contact_email" className="nlf-link break-all">
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
            channels=""
            ok-title-vi="Quỹ đã nhận lời nhắn của bạn"
            ok-title-en="The fund has your message"
            ok-body-vi="Cảm ơn bạn. Mã của bạn là {id}. Quỹ sẽ liên hệ lại trong {reply}, qua {channel}."
            ok-body-en="Thank you. Your reference is {id}. The fund will get back to you within {reply}, by {channel}."
            next-href={STATEMENT_URL}
            next-vi="Trong lúc chờ, xem sao kê công khai"
            next-en="While you wait, view the public statement"
            no-heading=""
            data-cta="gop_suc_form"
            topics-vi="Góp sức cho quỹ|Ủng hộ – quyên góp|Hợp tác tổ chức|Giới thiệu hoàn cảnh cần hỗ trợ"
            topics-en="Help the fund|Donation|Organisational partnership|Refer someone who needs support"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
