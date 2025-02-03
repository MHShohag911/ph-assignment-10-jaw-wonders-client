// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./Banner.css";
// import required modules
import { Autoplay } from "swiper/modules";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  const sliderImages = [
    "https://i.postimg.cc/ZYBb5GKJ/slider-1.jpg",
    "https://i.postimg.cc/pyb1WhV5/slider-2.jpg",
    "https://i.postimg.cc/C12Q2rWN/slider-3.jpg",
    "https://i.postimg.cc/Y0msBf7w/slider-4.jpg",
  ];

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
  return (
    <div>
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={50}
        slidesPerView={1}
        pagination={pagination}
        className="mySwiper relative"
      >
        {sliderImages.map((image, idx) => (
          <SwiperSlide key={idx}>
            <img src={image} alt="" />
          </SwiperSlide>
        ))}
        <div className="absolute top-0 left-0 right-0 z-10 text-white text-center bg-black/30 lg:py-40 h-full">
          <h2 className="text-2xl md:text-5xl font-bold lg:hidden md:mt-44 mt-16">
          Crafting <Typewriter words={[' Timeless']} loop={false}/>
          <br /> Treasures from Jute and Wood.
          </h2>
          <div className="lg:flex justify-center mt-5 lg:mt-40 hidden">
            <div className="flex items-center">
            <h2 className="text-2xl md:text-5xl font-bold items-center">
            Crafting <Typewriter words={[' Timeless']} loop={false}/>
            <br /> Treasures from Jute and Wood.
            </h2>
            </div>
            <div className="text-2xl font-bold w-1/2">
              <p className="mx-auto w-1/2 text-justify ">
                Discover the charm of nature’s finest materials brought to life
                through artistry and craftsmanship. Jute and wooden craft items
                are a harmonious blend of sustainability, tradition, and
                elegance. From intricately woven jute bags and home décor to
                beautifully carved wooden furniture and ornaments, these crafts
                showcase the timeless appeal of handmade creations.
              </p>
            </div>
          </div>
        </div>
      </Swiper>
    </div>
  );
};

export default Banner;
