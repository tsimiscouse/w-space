import React from "react";

const Section = ({ image, title, description, link, reverse }) => {
  return (
    <div
      className={`
        flex flex-col 
        ${reverse ? "md:flex-row-reverse" : "md:flex-row"} 
        items-center 
        py-8 
        sm:py-12 
        md:py-16 
        px-4 
        sm:px-6 
        md:px-8 
        max-w-7xl 
        mx-auto 
        gap-8 
        sm:gap-10 
        md:gap-12
      `}
    >
      <div 
        className={`
          w-full 
          md:w-1/2 
          ${reverse ? "md:ml-10 lg:ml-16" : "md:mr-10 lg:mr-16"}
          flex 
          justify-center 
          items-center
        `}
      >
        <img
          src={image}
          alt={title}
          className="
            rounded-lg 
            shadow-lg 
            w-full 
            max-w-md 
            h-auto 
            object-cover 
            transition-transform 
            duration-300 
            hover:scale-105
          "
        />
      </div>
      <div
        className={`
          w-full 
          md:w-1/2 
          ${reverse ? "md:pr-10 lg:pr-16" : "md:pl-10 lg:pl-16"}
          text-center 
          md:text-left 
          space-y-4
        `}
      >
        <h2 
          className="
            text-2xl 
            sm:text-3xl 
            md:text-4xl 
            font-bold 
            text-gray-900 
            leading-tight
          "
        >
          {title}
        </h2>
        <p 
          className="
            text-base 
            sm:text-lg 
            md:text-xl 
            text-gray-600 
            leading-relaxed
          "
        >
          {description}
        </p>
        <a
          href={link}
          className="
            inline-block 
            text-sm 
            sm:text-base 
            md:text-lg 
            text-blue-700 
            hover:text-blue-900 
            font-semibold 
            underline 
            decoration-blue-300 
            hover:decoration-blue-600 
            transition-all 
            duration-300
          "
        >
          Learn more →
        </a>
      </div>
    </div>
  );
};

export default Section;