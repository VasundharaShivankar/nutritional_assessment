import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    title: "Assess Nutritional Health",
    content: "Analyze children's health using images and anthropometric data.",
    image: "https://source.unsplash.com/900x500/?child,health",
  },
  {
    title: "Track Growth Progress",
    content: "Monitor children's height, weight, and nutritional milestones.",
    image: "https://source.unsplash.com/900x500/?child,growth",
  },
  {
    title: "Get Personalized Diet Plans",
    content: "Receive AI-powered food recommendations for better nutrition.",
    image: "https://source.unsplash.com/900x500/?healthy,food",
  },
];

const SliderSection = () => {
  return (
    <div className="bg-[#ffeef5] py-20 px-4 relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="max-w-4xl mx-auto"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="text-center">
              {/* Image */}
              <div className="w-full h-[300px] sm:h-[400px] mb-6 overflow-hidden rounded-xl shadow-lg">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Content */}
              <h2 className="text-2xl md:text-3xl font-bold text-pink-600 mb-2">
                {slide.title}
              </h2>
              <p className="text-md md:text-lg text-gray-800 max-w-xl mx-auto">
                {slide.content}
              </p>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Arrows */}
        <div className="custom-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-pink-500 text-4xl px-3">
          ‹
        </div>
        <div className="custom-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-pink-500 text-4xl px-3">
          ›
        </div>
      </Swiper>
    </div>
  );
};

export default SliderSection;
