"use client";
import SectionHeader from "@/components/Common/SectionHeader";
import { useState } from "react";

const Subscription = () => {
  const [billingCycle, setBillingCycle] = useState("monthly"); // 'monthly' or 'annually'

  const pricingPlans = [
    {
      name: "Basic",
      monthlyPrice: 9,
      annualPrice: 99,
      features: [
        "Access to 10 Templates",
        "Standard Documentation",
        "Email Support",
        "Basic Integrations",
      ],
      buttonText: "Get Started",
    },
    {
      name: "Pro",
      monthlyPrice: 29,
      annualPrice: 299,
      features: [
        "Access to All Templates",
        "Advanced Documentation",
        "Priority Support",
        "Premium Integrations",
        "Custom Branding",
      ],
      buttonText: "Choose Plan",
      popular: true,
    },
    {
      name: "Enterprise",
      monthlyPrice: 99,
      annualPrice: 999,
      features: [
        "Unlimited Template Usage",
        "Dedicated Support Manager",
        "Custom Integration Development",
        "On-Premise Deployment Options",
        "SLA & Uptime Guarantee",
      ],
      buttonText: "Contact Sales",
    },
  ];

  return (
    <>
      <section className="overflow-hidden pb-20 pt-15 lg:pb-25 xl:pb-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="animate_top mx-auto text-center">
            <SectionHeader
              headerInfo={{
                title: `SUBSCRIPTION PLANS`,
                subtitle: `Flexible Plans for Every Need`,
                description: `Choose the perfect plan that fits your team's size and requirements. Upgrade, downgrade, or cancel anytime.`,
              }}
            />
          </div>
        </div>

        <div className="relative mx-auto mt-15 max-w-[1207px] px-4 md:px-8 xl:mt-20 xl:px-0">
          <div className="absolute -bottom-15 -z-1 h-full w-full">
            {/* Image for dotted background, similar to Pricing component */}
            {/* <Image
              fill
              src="/images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
            /> */}
          </div>

          <div className="mb-10 flex justify-center">
            <div className="inline-flex rounded-full bg-gray-200 dark:bg-gray-700 p-1">
              <button
                className={`px-5 py-2 rounded-full text-sm font-medium ${
                  billingCycle === "monthly"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </button>
              <button
                className={`px-5 py-2 rounded-full text-sm font-medium ${
                  billingCycle === "annually"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setBillingCycle("annually")}
              >
                Annually (Save 20%)
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-7.5 lg:flex-nowrap xl:gap-12.5">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className="animate_top group relative rounded-lg border border-stroke bg-white p-7.5 shadow-solid-10 dark:border-strokedark dark:bg-blacksection dark:shadow-none md:w-[45%] lg:w-1/3 xl:p-12.5 transition-all duration-300 hover:scale-105"
              >
                {plan.popular && (
                  <div className="absolute -right-3.5 top-7.5 -rotate-90 rounded-bl-full rounded-tl-full bg-primary px-4.5 py-1.5 text-metatitle font-medium uppercase text-white">
                    popular
                  </div>
                )}

                <h3 className="mb-7.5 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle3">
                  $
                  {billingCycle === "monthly"
                    ? plan.monthlyPrice
                    : plan.annualPrice}{" "}
                  <span className="text-regular text-waterloo dark:text-manatee">
                    /{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </h3>
                <h4 className="mb-2.5 text-para2 font-medium text-black dark:text-white">
                  {plan.name} Plan
                </h4>
                <p className="text-base text-body dark:text-bodydark leading-relaxed">
                  {plan.name === "Basic" && "Ideal for individuals and small teams."}
                  {plan.name === "Pro" && "Perfect for growing startups and established businesses."}
                  {plan.name === "Enterprise" && "For large organizations and custom enterprise solutions."}
                </p>

                <div className="mt-9 border-t border-stroke pb-12.5 pt-9 dark:border-strokedark">
                  <ul>
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="mb-4 text-black last:mb-0 dark:text-manatee text-base leading-relaxed"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  aria-label={`Get the ${plan.name} Plan button`}
                  className="group/btn inline-flex items-center gap-2.5 font-medium text-blue-500 transition-all duration-300 dark:text-white dark:hover:text-blue-500 hover:scale-105"
                >
                  <span className="duration-300 group-hover/btn:pr-2">
                    {plan.buttonText}
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.4767 6.16701L6.00668 1.69701L7.18501 0.518677L13.6667 7.00034L7.18501 13.482L6.00668 12.3037L10.4767 7.83368H0.333344V6.16701H10.4767Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Placeholder for billing and cancellation section */}
          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-5">Manage Your Subscription</h2>
            <p className="text-base text-body dark:text-bodydark leading-relaxed mb-8">
              Here you can update your billing information, view your invoice history, or cancel your subscription.
            </p>
            <button className="px-6 py-3 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors duration-300">
              Cancel Subscription
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Subscription;