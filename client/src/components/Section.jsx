import React from "react";

const Section = ({ image, title, description, link, reverse }) => {
  return (
    <div
      className={`flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } items-center py-16`}
    >
      <div className={`md:w-1/2 ${
        reverse ? "ml-[40px]" : "mr:[40px]"
      }`}>
        <img
          src={image}
          alt={title}
          className="rounded-lg shadow-lg w-full h-auto"
        />
      </div>
      <div
        className={`md:w-1/2 ${
          reverse ? "md:pr-12" : "md:pl-12"
        } text-center md:text-left`}
      >
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        <p className="mt-4 text-lg text-gray-600">{description}</p>
        <a
          href={link}
          className="mt-4 inline-block text-blue-800 font-bold hover:underline"
        >
          Learn more →
        </a>
      </div>
    </div>
  );
};

export default Section;
