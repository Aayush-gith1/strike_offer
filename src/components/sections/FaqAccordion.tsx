import React, { useState } from "react";
import { faqData } from "@/data/faqData";

/**
 * Frequently Asked Questions Accordion section
 */
export const FaqAccordion: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-6 sm:py-8 md:py-10" id="faqs" aria-label="Frequently Asked Questions">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-5xl">
        {/* Section Heading */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Your Questions, <span className="font-audiowide">Answered</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 px-4">
            Get instant answers to most common questions about Strike.
          </p>
        </div>

        {/* Collapsible FAQ Items */}
        <div className="space-y-3 sm:space-y-4">
          {faqData.map((faq) => {
            const isOpen = activeId === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-gray-800 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-3 sm:p-4 md:p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-normal pr-4 sm:pr-6 md:pr-8">
                    {faq.question}
                  </span>

                  <div className="flex-shrink-0">
                    <div
                      className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <svg
                        className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </div>
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-3 sm:px-4 md:px-5 pb-3 sm:pb-4 md:pb-5">
                    <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqAccordion;
