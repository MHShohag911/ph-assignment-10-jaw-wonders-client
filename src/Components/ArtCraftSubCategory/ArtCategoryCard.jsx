import React from "react";
import { Avatar, Card } from "antd";
const ArtCategoryCard = ({ categoryProduct }) => (
  <Card
    className="mx-auto lg:w-3/4"
    cover={<img className="" alt="example" src={categoryProduct?.image} />}
  >
    <div className="">
    <div className="flex gap-2">
        <div>
          <Avatar size={60} src={categoryProduct?.artist?.profile_pic}></Avatar>
        </div>
        <div>
          <h2 className="text-primary font-bold">
            Artist: {categoryProduct?.artist?.name}
          </h2>
          <p className="text-gray-500 text-justify">
            {categoryProduct?.artist?.info}
          </p>
        </div>
      </div>
      <div>
        <h2 className="text-primary font-bold">
          Subcategory: {categoryProduct?.subcategory_name}
        </h2>
        <p className="text-gray-500 text-justify mb-5">
          {categoryProduct?.description}
        </p>
      </div>
    </div>
  </Card>
);
export default ArtCategoryCard;
