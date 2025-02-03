import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import { Fade } from "react-awesome-reveal";

const ArtGallery = () => {
  const [productPhotos, setProductPhotos] = useState([]);

  useEffect(() => {
    fetch("https://assignment-10-arts-and-crafts-server.vercel.app/products")
      .then((res) => res.json())
      .then((data) => setProductPhotos(data));
  }, []);
  return (
    <div>
      <h2 className="text-3xl md:text-5xl text-primary font-bold text-center my-10 ">
              <Fade>Art Gallery</Fade>
            </h2>
      <Swiper 
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={productPhotos.length>2}
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
        {productPhotos.map((product) => (
          <SwiperSlide className="!bg-transparent" key={product._id}>
            <div className="flex flex-col w-full items-center space-y-5 h-full">
                <img className="!w-full p-5" src={product.image} alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ArtGallery;
