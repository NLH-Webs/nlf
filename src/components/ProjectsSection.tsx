import handsSnack from "@/assets/hands-snack.jpg";
import { useTranslations } from "@/contexts/language-context";
import { ArrowUpRight } from "lucide-react";

// Photos of children stay on the fund's own Facebook posts until parents' consent is
// confirmed for this site; here we only show a photo where no face is visible.
const projectLinks = [
  "https://www.facebook.com/nlf.sg/posts/pfbid024XqkqaGw1TxC14vSHiKDsq5PFMfWtSFuaHLrEECHTPamjJAszyZmpKsGrZGw2xkUl",
  "https://www.facebook.com/nlf.sg/posts/pfbid02EWKwZ778akS7K5NZMAbNTMAXYjaP4JSsUNdQq9Ejom7VkjeUffy5ZihMkFCnt6avl",
  "https://www.facebook.com/nlf.sg/posts/pfbid02cW7t3SHDxMumPuRk41n1PZT6Wh1qXosRK1XfFFygqGsBtJgN9gJWFhTtT8VZKG2rl",
  "https://www.facebook.com/nlf.sg/posts/pfbid0YSSnrY6qomanumz5f15ni7WT9cu9pEq27Dr34NRzHK1ErTvxee7CG6NThq9fPmTkl",
  "https://www.facebook.com/nlf.sg/posts/pfbid0KAWn5jDioHAT8fBGA6oxCfoYxDzyLYqXehEQJKHs6cfPQhwzGGoDdNutSRufvvzEl",
  "https://www.facebook.com/nlf.sg/posts/pfbid09piuRXctzqpNqEBtjriLFb54igGBQyQej83YwSb9joYnkgBiRZYZAmkXiewT1qKml",
  "https://www.facebook.com/nlf.sg/posts/pfbid0ECdtSjNuTT3zsZ8PSNJ4HbVcAUuPq1D4PKnrS2pUfRRXAHbXzqJ3yzGSuXAxfET1l",
  "https://www.facebook.com/nlf.sg/posts/pfbid02vU6NpKr3NPhKTgMRFFoaH1hmEhRcTwSJbrz23HZYGsm3S2jnNjTWdocYbbdEqCk2l",
  "https://www.facebook.com/nlf.sg/posts/pfbid02hNRn2ZujdWL6r7p3mAcwGB4r39GCbbMpmRCPb91H6jVSxfYpAu7jRLUvuPZ7ah5Gl",
] as const;

const ProjectsSection = () => {
  const { projects } = useTranslations();

  return (
    <section id="projects" className="bg-secondary py-14 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="nlf-reveal mb-10 grid items-end gap-6 md:grid-cols-[1fr_280px]">
          <div>
            <span className="nlf-gold-rule mb-4" aria-hidden="true" />
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-4xl">{projects.heading}</h2>
            <p className="mt-2 max-w-2xl text-slate-700">{projects.subheading}</p>
          </div>
          <img
            src={handsSnack}
            alt={projects.imageAlt}
            width={434}
            height={572}
            loading="lazy"
            className="hidden h-56 w-full rounded-2xl object-cover shadow md:block"
          />
        </div>

        {/* F pattern: short title first, then at most two sentences, then one link. */}
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.items.map((item, index) => (
            <li
              key={projectLinks[index]}
              className="nlf-reveal flex flex-col rounded-xl bg-card p-5 shadow-sm"
              style={{ transitionDelay: `${(index % 3) * 60}ms` }}
            >
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm text-slate-700">{item.description}</p>
              <a
                href={projectLinks[index]}
                data-track="cta"
                data-cta={`project_post_${index + 1}`}
                target="_blank"
                rel="noopener noreferrer"
                className="nlf-link mt-3 inline-flex min-h-11 items-center gap-1 text-sm font-medium"
              >
                {projects.cta}
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ProjectsSection;
