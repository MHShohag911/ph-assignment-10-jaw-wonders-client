import { Button } from "antd";
import { Helmet } from "react-helmet-async";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";

const ProductDetails = () => {
  const product = useLoaderData();
  const {
    _id,
    image,
    item_name,
    subcategory_name,
    short_description,
    price,
    rating,
    customization,
    processing_time,
    stock_status,
    user_email,
    user_name,
  } = product;
  console.log(product);

  return (
    <div className="min-h-[600px] p-5">
      <Helmet>
        <title>JAW Wonders | Product Details</title>
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-20 lg:container mx-auto gap-5">
        <div className="">
          <img className="w-full" src={image} />
        </div>
        <div className="flex flex-col justify-center">
          <div className="px-5 space-y-2">
            <h2 className="text-2xl font-bol text-primary font-bold">
              {item_name}
            </h2>
            <p className="text-gray-400">Subcategory: {subcategory_name}</p>
            <p className="flex items-center font-bold">
              <span className="flex mr-1 text-[#FFC308]">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </span>
              <span className="dark:text-white">{`(${rating})`}</span>
            </p>
            <p className="text-primary font-bold">Price: {price}</p>
            <p className="text-gray-400">{short_description}</p>
            <p className="dark:text-white">Stock: {stock_status}</p>
            <p className="dark:text-white">Delivery: {processing_time}</p>
            <Button className="bg-primary uppercase font-bold text-xs rounded-none btn-primary">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
