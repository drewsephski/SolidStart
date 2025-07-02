"use client";
import React from "react";
import SingleBrand from "./SingleBrand";
import brandData from "./brandData";
import SectionHeader from "@/components/Common/SectionHeader";

const Brands = () => {
  return (
    <>
      {/* <!-- ===== Clients Start ===== --> */}
      <section className="border border-x-0 border-y-stroke bg-alabaster py-11 dark:border-y-strokedark dark:bg-black">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <SectionHeader
            headerInfo={{
              title: "Trusted by Leading Technologies",
              subtitle: "Powering Your SaaS Solutions",
              description:
                "Our templates are built with the latest and most trusted technologies in the SaaS industry, ensuring robustness, scalability, and performance.",
            }}
          />
          <div className="grid grid-cols-3 items-center justify-center gap-10 md:grid-cols-6 lg:gap-15 xl:gap-30 py-10">
            {brandData.map((brand, key) => (
              <SingleBrand brand={brand} key={key} />
            ))}
          </div>
        </div>
      </section>
      {/* <!-- ===== Clients End ===== --> */}
    </>
  );
};

export default Brands;
