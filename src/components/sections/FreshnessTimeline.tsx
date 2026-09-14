"use client";

import { FRESHNESS_STEPS } from "@/lib/constants";

export default function FreshnessTimeline() {
  return (
    <section
      id="freshness"
      className="py-16 md:py-24 bg-gradient-to-b from-background to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Our <span className="text-primary">Freshness</span> Promise
          </h2>
          <p className="text-text-light max-w-2xl mx-auto">
            From the moment you order to the moment it reaches your table,
            every step is handled with care.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent md:-translate-x-0.5" />

            {FRESHNESS_STEPS.map((step, index) => (
              <div
                key={step.label}
                className={`relative flex items-start gap-4 mb-8 last:mb-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div
                  className={`hidden md:block md:w-1/2 ${
                    index % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"
                  }`}
                >
                  <h3 className="font-semibold text-text text-lg">
                    {step.label}
                  </h3>
                  <p className="text-text-light text-sm">{step.description}</p>
                </div>

                <div className="relative z-10 flex-shrink-0">
                  <div className="w-12 h-12 bg-white border-2 border-primary rounded-full flex items-center justify-center shadow-md">
                    <span className="text-primary font-bold">{index + 1}</span>
                  </div>
                </div>

                <div
                  className={`md:w-1/2 ${
                    index % 2 === 0 ? "md:pl-8" : "md:pr-8"
                  }`}
                >
                  <div className="md:hidden">
                    <h3 className="font-semibold text-text text-lg">
                      {step.label}
                    </h3>
                    <p className="text-text-light text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-primary/10 px-6 py-3 rounded-full">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-5 h-5 text-secondary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-semibold text-primary">
              Prepared Today: Maximum Freshness
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
