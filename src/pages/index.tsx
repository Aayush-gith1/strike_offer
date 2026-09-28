import React, { useEffect } from "react";
import HeroBanner from "@/components/sections/HeroBanner";
import MembershipPricing from "@/components/sections/MembershipPricing";
import CourseCatalog from "@/components/sections/CourseCatalog";
import ValueProps from "@/components/sections/ValueProps";
import PartnerMarquee from "@/components/sections/PartnerMarquee";
import MentorProfiles from "@/components/sections/MentorProfiles";
import StudentReviews from "@/components/sections/StudentReviews";
import FaqAccordion from "@/components/sections/FaqAccordion";
import DiwaliStrikeEditor from "@/components/sections/DiwaliStrikeEditor";

/**
 * Main Landing Page for the Platform
 */
const LandingPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-features pointer-events-none" />

      {/* Main Content Sections */}
      <div className="relative z-10 w-full">
        {/* Hero Section with Diwali Strike Code Editor */}
        <section id="home">
          <HeroBanner />
          <DiwaliStrikeEditor />
        </section>

        {/* Pricing Section */}
        <section id="membership">
          <MembershipPricing />
        </section>

        {/* Courses Section */}
        <section id="courses">
          <CourseCatalog />
        </section>

        {/* Why Choose Us */}
        <section id="why-choose-us">
          <ValueProps />
        </section>

        {/* Partner / Hiring Marquee Section */}
        <section id="premium">
          <PartnerMarquee />
        </section>

        {/* Instructors Section */}
        <section id="instructors">
          <MentorProfiles />
        </section>

        {/* Testimonials */}
        <section id="testimonials">
          <StudentReviews />
        </section>

        {/* FAQs */}
        <section id="faqs">
          <FaqAccordion />
        </section>
      </div>
    </main>
  );
};

export default LandingPage;
