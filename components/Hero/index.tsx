"use client";
import Image from "next/image";
import { useState } from "react";

const Hero = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
            <div className=" md:w-1/2">
              <h3 className="mb-4.5 font-medium text-black dark:text-white">
                <span className="text-blue-500 font-bold">Discover, Customize, Launch</span>
                <br /> Your Next SaaS Idea
              </h3>
              <h1 className="mb-5 font-bold text-black dark:text-white lg:text-5xl xl:text-hero pr-0 xl:pr-16 ">
                The Ultimate SaaS Template {"   "}
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark ">
                  Marketplace
                </span>
              </h1>
              <p className="text-base text-body dark:text-bodydark leading-relaxed">
                Accelerate your SaaS product development with our curated collection of high-quality, production-ready Next.js templates. Find boilerplates for various niches, integrate essential features, and launch your application faster than ever.
              </p>

              <div className="mt-10">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap gap-5">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Enter your email to explore templates"
                      className="rounded-full border border-stroke px-6 py-2.5 shadow-solid-2 focus:border-primary focus:outline-none dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary w-full md:w-[60%] lg:w-[50%]"
                    />
                    <button
                      aria-label="explore templates button"
                      className="flex rounded-full bg-blue-500 px-7.5 py-2.5 text-white duration-300 ease-in-out hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 font-medium tracking-wide"
                    >
                      Explore Templates
                    </button>
                  </div>
                </form>

                <p className="mt-5 text-black dark:text-white text-sm">
                  Start building your dream SaaS today. No credit card required.
                </p>
              </div>
            </div>

            <div className="animate_right hidden md:w-1/2 lg:block">
              <div className="relative 2xl:-mr-7.5">
                <Image
                  src="/images/shape/shape-01.png"
                  alt="shape"
                  width={46}
                  height={246}
                  className="absolute -left-11.5 top-0 animate-spin-slowest hover:scale-140 transition-all duration-300 ease-in-out"
                />
                <Image
                  src="/images/shape/shape-02.svg"
                  alt="shape"
                  width={80}
                  height={80}
                  className="absolute bottom-0 right-0 z-10 animate-bounce-slow hover:scale-140 transition-all duration-300 ease-in-out"
                />
                <Image
                  src="/images/shape/shape-03.svg"
                  alt="shape"
                  width={50}
                  height={50}
                    className="absolute -right-10.5 bottom-0 z-1 animate-pulse-slow hover:scale-180 transition-all duration-300 ease-in-out"
                />
                <div className=" relative aspect-700/444 w-full">
                  <Image
                    className="shadow-solid-l dark:hidden"
                    src="/images/hero/hero-light.svg"
                    alt="Hero"
                    fill
                  />
                  <Image
                    className="hidden shadow-solid-l dark:block"
                    src="/images/hero/hero-dark.svg"
                    alt="Hero"
                    fill
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
