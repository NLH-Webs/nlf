import { useTranslations } from "@/contexts/language-context";
import { Mail, ShieldCheck } from "lucide-react";

const ContactSection = () => {
  const { contact } = useTranslations();

  return (
    <section id="contact" className="bg-slate-50 py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              {contact.title}
            </h2>
            <p className="text-lg text-slate-600">{contact.subtitle}</p>
          </div>

          {/* Contact Information */}
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            {/* Email */}
            <div className="rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-semibold text-slate-900">
                    {contact.email}
                  </h3>
                  <a
                    href="mailto:nhilefoundation.sg@gmail.com"
                    className="text-primary hover:underline break-all"
                  >
                    nhilefoundation.sg@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-semibold text-slate-900">
                    {contact.address}
                  </h3>
                  <a
                    href="https://thiennguyen.app/user/nhilefoundation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    thiennguyen.app/user/nhilefoundation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
