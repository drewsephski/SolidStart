import React from "react";
import { FeatureTab } from "@/types/featureTab";
import Image from "next/image";

const FeaturesTabItem = ({ featureTab }: { featureTab: FeatureTab }) => {
  const { title, desc1, desc2, image, imageDark } = featureTab;

  return (
    <>
      <div className="flex items-center gap-8 lg:gap-19">
        <div className="md:w-1/2">
          <h2 className="mb-7 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle2">
            {title}
          </h2>
          <p className="mb-5 text-base text-body dark:text-bodydark leading-relaxed">{desc1}</p>
          <p className="w-11/12 text-base text-body dark:text-bodydark leading-relaxed">{desc2}</p>
        </div>
        <div className="relative mx-auto hidden aspect-562/366 max-w-[550px] md:block md:w-1/2">
          <Image src={image} alt={title} fill className="dark:hidden transition-all duration-300 hover:scale-105" />
          <Image
            src={imageDark}
            alt={title}
            fill
            className="hidden dark:block transition-all duration-300 hover:scale-105"
          />
        </div>
      </div>
    </>
  );
};

export default FeaturesTabItem;
