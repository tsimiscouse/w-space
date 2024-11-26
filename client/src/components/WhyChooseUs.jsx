import React from 'react';

const MoneyIcon = () => (
  <svg className="w-6 h-6 text-black-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 8.5c0-1.1-1.343-2-3-2s-3 .9-3 2c0 2.6 6 1.3 6 4c0 1.1-1.343 2-3 2s-3-.9-3-2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 4v2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 16v2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ExpandIcon = () => (
  <svg className="w-6 h-6 text-black-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
  </svg>
);

const TimeIcon = () => (
  <svg className="w-6 h-6 text-black-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ReasonCard = ({ number, title, description }) => {
  return (
    <div className="
      flex flex-col 
      items-start 
      py-6 
      px-4 
      sm:px-6 
      md:px-0 
      transition-all 
      duration-300 
      hover:bg-gray-50 
      rounded-lg
    ">
      <div className="
        rounded-full 
        border-2 
        border-gray-300 
        p-3 
        sm:p-4 
        mb-4 
        sm:mb-6 
        flex 
        items-center 
        justify-center 
        transition-all 
        duration-300 
        group-hover:border-blue-500
      ">
        {number === "01" && <ExpandIcon />}
        {number === "02" && <MoneyIcon />}
        {number === "03" && <TimeIcon />}
      </div>
      <div className="
        text-gray-400 
        text-lg 
        sm:text-xl 
        mb-2 
        sm:mb-4
      ">
        {number}
      </div>
      <h3 className="
        text-xl 
        sm:text-2xl 
        md:text-3xl 
        font-semibold 
        mb-2 
        sm:mb-4 
        text-gray-800
      ">
        {title}
      </h3>
      <p className="
        text-base 
        sm:text-lg 
        text-gray-600 
        leading-relaxed
      ">
        {description}
      </p>
    </div>
  );
};

const WhyChooseUs = () => {
  const reasons = [
    {
      number: "01",
      title: "Convenience and Flexibility",
      description: "At W-Space, we make finding the perfect space simple and seamless. Whether you need a quiet workspace, a buzzing internet café, or a spot for collaboration, we offer a variety of spaces tailored to your needs. Book on-demand, schedule ahead, and enjoy the flexibility of hourly, daily, or long-term rentals, all at your fingertips."
    },
    {
      number: "02",
      title: "Affordable, Premium Options",
      description: "Why settle for less? W-Space connects you with high-quality, well-maintained spaces at competitive prices. From high-speed internet to comfortable furniture and amenities, we ensure a productive environment without breaking the bank. Exceptional value meets unmatched quality here at W-Space."
    },
    {
      number: "03",
      title: "Your Productivity Partner",
      description: "We understand how important the right space is for productivity and focus. That's why W-Space prioritizes convenience, comfort, and accessibility. With carefully curated locations and a hassle-free booking experience, we're here to help you achieve more in the ideal setting."
    }
  ];

  return (
    <div className="
      w-full 
      max-w-7xl 
      mx-auto 
      px-4 
      sm:px-6 
      md:px-8 
      py-12 
      sm:py-16 
      md:py-20
    ">
      <div className="
        text-center 
        md:text-left 
        mb-8 
        sm:mb-12 
        md:mb-16
      ">
        <h2 className="
          text-3xl 
          sm:text-4xl 
          md:text-5xl 
          font-bold 
          mb-4 
          sm:mb-6 
          text-gray-900
        ">
          Why Choose Us?
        </h2>
        <p className="
          text-base 
          sm:text-lg 
          text-gray-600 
          max-w-4xl 
          mx-auto 
          md:mx-0 
          leading-relaxed
        ">
          W-Space isn't just a booking platform—it's your partner in success. We carefully select spaces to ensure they meet the highest standards of comfort, accessibility, and functionality. Our commitment to client satisfaction, combined with exceptional customer support, makes W-Space the go-to choice for individuals and teams seeking the perfect environment to thrive.
        </p>
      </div>
      <div className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        gap-6 
        sm:gap-8 
        md:gap-10 
        group
      ">
        {reasons.map((reason) => (
          <ReasonCard
            key={reason.number}
            number={reason.number}
            title={reason.title}
            description={reason.description}
          />
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;