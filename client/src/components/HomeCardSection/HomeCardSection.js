import React from 'react';
import cardsectionImg from './cardsectionImg.jpg';

const HomeCardSection = () => {
  const features = [
    {
        title: 'Not Just Better Care, But A Better Experience',
        text: 'Get fast, accurate skin assessments from the comfort of your device. No waiting rooms, no guesswork — just clear, reliable insights to guide your psoriasis care with ease and support.',
      },
      {
        title: 'Serving All People Through Exemplary Care',
        text: "We believe everyone deserves accessible, respectful care. Our psoriasis tool provides clarity and support to all, no matter who you are or where you're from.",
      },
      {
        title: 'Clarity for Every Skin Journey',
        text: 'Psoriasis can be unpredictable — understanding it shouldn’t be. Our tool helps you track and interpret your skin condition with confidence, anytime you need it.',
      }
  ];

  return (
    <div className="w-full bg-pink-50 text-pink-900 overflow-hidden">

      {/* Features */}
      <section className="py-16 px-6 animate-fadeInUp">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-15 min-h-[260px] shadow-md hover:shadow-xl/20 transition-all duration-300 animate-slideInUp delay-[200ms] mt-25"
            >
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-base text-black mb-6 ">{feature.text}</p>
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full transition duration-300">
                Learn More &rarr;
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Image + Text Section */}
      <section className="py-35 px-6 bg-pink-100 animate-fadeInUp delay-[400ms]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <img src={cardsectionImg} alt="Card Section" className='h-full w-2/4' />

          {/* Text */}
          <div className="w-full lg:w-1/2 animate-slideInRight delay-[600ms]">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Understanding Psoriasis <br />
              <span className="text-pink-700">In Medical Practice</span>
            </h2>
            <p className="mb-4 text-base text-black">
            Psoriasis is a chronic autoimmune skin condition that speeds up the life cycle of skin cells, causing scaling and inflammation. It typically appears as red patches covered with silvery scales and may occur on the scalp, elbows, knees, and lower back.
            </p>
            <p className="text-base text-black">
            Although the exact cause is unknown, it is believed to result from a combination of genetic and environmental factors. Triggers can include infections, stress, cold weather, and certain medications.

            Early diagnosis and treatment are essential in managing symptoms and improving quality of life. Treatments range from topical creams and phototherapy to systemic medications and biologics, tailored to each individual’s condition and needs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeCardSection;