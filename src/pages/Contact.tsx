import { useState } from "react";
import { useLanguage, useTranslations } from "@/contexts/language-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, ShieldCheck, Send } from "lucide-react";

const Contact = () => {
  const { contact } = useTranslations();
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You could add a toast notification here
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Header Section */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl">
              {contact.title}
            </h1>
            <p className="text-lg text-slate-600">{contact.subtitle}</p>
          </div>

          {/* Contact Information Section */}
          <div className="mb-12 grid gap-8 md:grid-cols-2">
            {/* Email */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-900">
                    {contact.email}
                  </h3>
                  <a
                    href="mailto:nedu@nhi.sg"
                    className="text-primary hover:underline"
                  >
                    nedu@nhi.sg
                  </a>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
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

          {/* Lead form: posts to NhiLe Leads (Sheet + email to contact@nhi.sg) */}
          <nlh-contact site="nlf" lang={language} topics-vi="Ủng hộ – quyên góp|Tình nguyện chuyên môn|Hợp tác tổ chức|Giới thiệu hoàn cảnh cần hỗ trợ" topics-en="Donation|Volunteer your expertise|Organisational partnership|Refer someone who needs support" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
