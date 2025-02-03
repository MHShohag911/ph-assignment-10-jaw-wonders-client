import { Avatar, Rate } from "antd";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "./CustomersReviews.css";
import { Fade } from "react-awesome-reveal";

const CustomersReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://assignment-10-arts-and-crafts-server.vercel.app/customersReviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
  return (
    <div>
      <h2 className="text-3xl md:text-5xl px-5 text-primary font-bold text-center my-10 ">
              <Fade>What Our Customers Say</Fade>
            </h2>
      <Fade>
      <Swiper
        className="!p-5"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={reviews.length>2}
        slidesPerView={1}
        slidesPerGroup={1}
        spaceBetween={30}
        modules={[Pagination, Autoplay]}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          600: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide className="rounded-xl dark:bg-white/20" key={review._id}>
            <div className="p-10 flex flex-col items-center space-y-5 h-full">
              <div className="min-h-36">
                <p>
                  <span className="text-3xl text-secondary">"</span>
                  <span className="relative text-justify dark:text-white text-gray-500">
                    {review.review}
                  </span>
                  <span className="text-3xl text-secondary">"</span>
                </p>
              </div>
              <Avatar size={70} src={review.user_image}></Avatar>
              <p className="text-primary font-bold">{review.user_name}</p>
              <div className="">
                <Rate
                  className="text-xs"
                  allowHalf
                  defaultValue={review.rating}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </Fade>
    </div>
  );
};

export default CustomersReviews;
