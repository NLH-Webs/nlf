import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import AboutSection from '@/components/AboutSection';
import TransparencySection from '@/components/TransparencySection';
import ProjectsSection from '@/components/ProjectsSection';
import CallToActionSection from '@/components/CallToActionSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { useLanguage } from "@/contexts/language-context";

const Index = () => {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ProjectsSection />
        <TransparencySection />
        <CallToActionSection />
        <ContactSection />
        <section className="nlh-lead" id="lien-he">
          <nlh-contact site="nlf" lang={language} topics-vi="Ủng hộ – quyên góp|Tình nguyện chuyên môn|Hợp tác tổ chức|Giới thiệu hoàn cảnh cần hỗ trợ" topics-en="Donation|Volunteer your expertise|Organisational partnership|Refer someone who needs support" />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
