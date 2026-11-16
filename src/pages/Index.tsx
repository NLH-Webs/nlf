import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import TransparencySection from "@/components/TransparencySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useReveal } from "@/hooks/use-reveal";

// Order follows the visitor's question: what is this fund -> what has it done ->
// can I check the money -> how do I help.
const Index = () => {
  useReveal();
  return (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <HeroSection />
      <ProjectsSection />
      <TransparencySection />
      <ContactSection />
    </main>
    <Footer />
  </div>
  );
};

export default Index;
