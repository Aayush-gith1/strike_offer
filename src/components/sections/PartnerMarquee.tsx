import React from "react";
import { motion } from "motion/react";
import LogoLoop from "@/components/LogoLoop";

export const PartnerMarquee: React.FC = () => {
  const companyLogos = [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      alt: "Google",
      title: "Google",
      width: 120,
      height: 40,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
      alt: "Meta",
      title: "Meta",
      width: 100,
      height: 36,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/donate/thumb/f/fd/Amazon-logo-white.svg/960px-Amazon-logo-white.svg.png?utm_source=donate.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20140722143457",
      alt: "Amazon",
      title: "Amazon",
      width: 110,
      height: 36,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
      alt: "Apple",
      title: "Apple",
      width: 40,
      height: 48,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
      alt: "Netflix",
      title: "Netflix",
      width: 130,
      height: 32,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg",
      alt: "Cisco",
      title: "Cisco",
      width: 120,
      height: 42,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
      alt: "PayPal",
      title: "PayPal",
      width: 120,
      height: 32,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
      alt: "Oracle",
      title: "Oracle",
      width: 110,
      height: 28,
    },
  ];

  return (
    <section id="premium" className="w-[85%] max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl bg-zinc-950/80 border border-zinc-800/80 p-6 sm:p-10"
      >
        <div className="relative z-10 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl text-zinc-100 max-w-3xl mx-auto mb-8 leading-snug">
            Get All <span className="font-audiowide text-amber-400">Premium</span> Questions
            Asked In <span className="font-audiowide text-white">FAANG Companies</span>
          </h2>

          <div className="w-full h-[80px] flex items-center logo-loop">
            <LogoLoop
              logos={companyLogos}
              speed={45}
              direction="left"
              logoHeight={42}
              gap={50}
              pauseOnHover={true}
              scaleOnHover={true}
              fadeOut={false}
              ariaLabel="FAANG and top tech companies"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PartnerMarquee;
